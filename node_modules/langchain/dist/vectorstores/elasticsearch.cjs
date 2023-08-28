"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticVectorSearch = void 0;
const uuid = __importStar(require("uuid"));
const document_js_1 = require("../document.cjs");
const base_js_1 = require("./base.cjs");
class ElasticVectorSearch extends base_js_1.VectorStore {
    constructor(embeddings, args) {
        super(embeddings, args);
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "indexName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "engine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "similarity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "efConstruction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "m", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "candidates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.engine = args.vectorSearchOptions?.engine ?? "hnsw";
        this.similarity = args.vectorSearchOptions?.similarity ?? "l2_norm";
        this.m = args.vectorSearchOptions?.m ?? 16;
        this.efConstruction = args.vectorSearchOptions?.efConstruction ?? 100;
        this.candidates = args.vectorSearchOptions?.candidates ?? 200;
        this.client = args.client;
        this.indexName = args.indexName ?? "documents";
    }
    async addDocuments(documents, options) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents, options);
    }
    async addVectors(vectors, documents, options) {
        await this.ensureIndexExists(vectors[0].length, this.engine, this.similarity, this.efConstruction, this.m);
        const documentIds = options?.ids ?? Array.from({ length: vectors.length }, () => uuid.v4());
        const operations = vectors.flatMap((embedding, idx) => [
            {
                index: {
                    _id: documentIds[idx],
                    _index: this.indexName,
                },
            },
            {
                embedding,
                metadata: documents[idx].metadata,
                text: documents[idx].pageContent,
            },
        ]);
        await this.client.bulk({ refresh: true, operations });
        return documentIds;
    }
    async similaritySearchVectorWithScore(query, k, filter) {
        const result = await this.client.search({
            index: this.indexName,
            knn: {
                field: "embedding",
                query_vector: query,
                filter: this.buildMetadataTerms(filter),
                k,
                num_candidates: this.candidates,
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result.hits.hits.map((hit) => [
            new document_js_1.Document({
                pageContent: hit._source.text,
                metadata: hit._source.metadata,
            }),
            hit._score,
        ]);
    }
    async delete(params) {
        const operations = params.ids.map((id) => ({
            delete: {
                _id: id,
                _index: this.indexName,
            },
        }));
        await this.client.bulk({ refresh: true, operations });
    }
    static fromTexts(texts, metadatas, embeddings, args) {
        const documents = texts.map((text, idx) => {
            const metadata = Array.isArray(metadatas) ? metadatas[idx] : metadatas;
            return new document_js_1.Document({ pageContent: text, metadata });
        });
        return ElasticVectorSearch.fromDocuments(documents, embeddings, args);
    }
    static async fromDocuments(docs, embeddings, dbConfig) {
        const store = new ElasticVectorSearch(embeddings, dbConfig);
        await store.addDocuments(docs).then(() => store);
        return store;
    }
    static async fromExistingIndex(embeddings, dbConfig) {
        const store = new ElasticVectorSearch(embeddings, dbConfig);
        const exists = await store.doesIndexExist();
        if (exists) {
            return store;
        }
        throw new Error(`The index ${store.indexName} does not exist.`);
    }
    async ensureIndexExists(dimension, engine = "hnsw", similarity = "l2_norm", efConstruction = 100, m = 16) {
        const request = {
            index: this.indexName,
            mappings: {
                dynamic_templates: [
                    {
                        // map all metadata properties to be keyword
                        "metadata.*": {
                            match_mapping_type: "*",
                            mapping: { type: "keyword" },
                        },
                    },
                ],
                properties: {
                    text: { type: "text" },
                    metadata: { type: "object" },
                    embedding: {
                        type: "dense_vector",
                        dims: dimension,
                        index: true,
                        similarity,
                        index_options: {
                            type: engine,
                            m,
                            ef_construction: efConstruction,
                        },
                    },
                },
            },
        };
        const indexExists = await this.doesIndexExist();
        if (indexExists)
            return;
        await this.client.indices.create(request);
    }
    buildMetadataTerms(filter) {
        if (filter == null)
            return [];
        const result = [];
        for (const [key, value] of Object.entries(filter)) {
            result.push({ term: { [`metadata.${key}`]: value } });
        }
        return result;
    }
    async doesIndexExist() {
        return await this.client.indices.exists({ index: this.indexName });
    }
    async deleteIfExists() {
        const indexExists = await this.doesIndexExist();
        if (!indexExists)
            return;
        await this.client.indices.delete({ index: this.indexName });
    }
}
exports.ElasticVectorSearch = ElasticVectorSearch;
