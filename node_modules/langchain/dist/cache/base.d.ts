import { Generation, StoredGeneration } from "../schema/index.js";
/**
 * This cache key should be consistent across all versions of langchain.
 * It is currently NOT consistent across versions of langchain.
 *
 * A huge benefit of having a remote cache (like redis) is that you can
 * access the cache from different processes/machines. The allows you to
 * seperate concerns and scale horizontally.
 *
 * TODO: Make cache key consistent across versions of langchain.
 */
export declare const getCacheKey: (...strings: string[]) => string;
export declare function deserializeStoredGeneration(storedGeneration: StoredGeneration): {
    text: string;
    message: import("../schema/index.js").HumanMessage | import("../schema/index.js").AIMessage | import("../schema/index.js").SystemMessage | import("../schema/index.js").FunctionMessage | import("../schema/index.js").ChatMessage;
} | {
    text: string;
    message?: undefined;
};
export declare function serializeGeneration(generation: Generation): StoredGeneration;
