import type { ChromaClient as ChromaClientT, Collection } from "chromadb";
import type { Where } from "chromadb/dist/main/types.js";
import { Embeddings } from "../embeddings/base.js";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export type ChromaLibArgs = {
    url?: string;
    numDimensions?: number;
    collectionName?: string;
    filter?: object;
} | {
    index?: ChromaClientT;
    numDimensions?: number;
    collectionName?: string;
    filter?: object;
};
export interface ChromaDeleteParams<T> {
    ids?: string[];
    filter?: T;
}
export declare class Chroma extends VectorStore {
    FilterType: Where;
    index?: ChromaClientT;
    collection?: Collection;
    collectionName: string;
    numDimensions?: number;
    url: string;
    filter?: object;
    constructor(embeddings: Embeddings, args: ChromaLibArgs);
    addDocuments(documents: Document[], options?: {
        ids?: string[];
    }): Promise<string[]>;
    ensureCollection(): Promise<Collection>;
    addVectors(vectors: number[][], documents: Document[], options?: {
        ids?: string[];
    }): Promise<string[]>;
    delete(params: ChromaDeleteParams<this["FilterType"]>): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number, filter?: this["FilterType"]): Promise<[Document<Record<string, any>>, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: ChromaLibArgs): Promise<Chroma>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: ChromaLibArgs): Promise<Chroma>;
    static fromExistingCollection(embeddings: Embeddings, dbConfig: ChromaLibArgs): Promise<Chroma>;
    static imports(): Promise<{
        ChromaClient: typeof ChromaClientT;
    }>;
}
