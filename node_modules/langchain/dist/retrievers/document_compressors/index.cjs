"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentCompressorPipeline = exports.BaseDocumentCompressor = void 0;
/**
 * Base Document Compression class. All compressors should extend this class.
 */
class BaseDocumentCompressor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isBaseDocumentCompressor(x) {
        return x?.compressDocuments !== undefined;
    }
}
exports.BaseDocumentCompressor = BaseDocumentCompressor;
/**
 * Document compressor that uses a pipeline of Transformers.
 */
class DocumentCompressorPipeline extends BaseDocumentCompressor {
    constructor(fields) {
        super();
        Object.defineProperty(this, "transformers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.transformers = fields.transformers;
    }
    async compressDocuments(documents, query, callbacks) {
        let transformedDocuments = documents;
        for (const transformer of this.transformers) {
            if (BaseDocumentCompressor.isBaseDocumentCompressor(transformer)) {
                transformedDocuments = await transformer.compressDocuments(transformedDocuments, query, callbacks);
            }
            else {
                transformedDocuments = await transformer.transformDocuments(transformedDocuments);
            }
        }
        return transformedDocuments;
    }
}
exports.DocumentCompressorPipeline = DocumentCompressorPipeline;
