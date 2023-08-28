import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
type PineconeMetadata = Record<string, any>;
type VectorOperationsApi = ReturnType<import("@pinecone-database/pinecone").PineconeClient["Index"]>;
export interface PineconeLibArgs {
    pineconeIndex: VectorOperationsApi;
    textKey?: string;
    namespace?: string;
    filter?: PineconeMetadata;
}
export type PineconeDeleteParams = {
    ids?: string[];
    deleteAll?: boolean;
    namespace?: string;
};
export declare class PineconeStore extends VectorStore {
    FilterType: PineconeMetadata;
    textKey: string;
    namespace?: string;
    pineconeIndex: VectorOperationsApi;
    filter?: PineconeMetadata;
    constructor(embeddings: Embeddings, args: PineconeLibArgs);
    addDocuments(documents: Document[], options?: {
        ids?: string[];
    } | string[]): Promise<string[]>;
    addVectors(vectors: number[][], documents: Document[], options?: {
        ids?: string[];
    } | string[]): Promise<string[]>;
    delete(params: PineconeDeleteParams): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number, filter?: PineconeMetadata): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: {
        /**
         * @deprecated Use pineconeIndex instead
         */
        pineconeClient: VectorOperationsApi;
        textKey?: string;
        namespace?: string | undefined;
    } | PineconeLibArgs): Promise<PineconeStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: PineconeLibArgs): Promise<PineconeStore>;
    static fromExistingIndex(embeddings: Embeddings, dbConfig: PineconeLibArgs): Promise<PineconeStore>;
}
export {};
