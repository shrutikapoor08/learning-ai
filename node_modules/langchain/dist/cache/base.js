import hash from "object-hash";
import { mapStoredMessageToChatMessage, } from "../schema/index.js";
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
export const getCacheKey = (...strings) => hash(strings.join("_"));
export function deserializeStoredGeneration(storedGeneration) {
    if (storedGeneration.message !== undefined) {
        return {
            text: storedGeneration.text,
            message: mapStoredMessageToChatMessage(storedGeneration.message),
        };
    }
    else {
        return { text: storedGeneration.text };
    }
}
export function serializeGeneration(generation) {
    const serializedValue = {
        text: generation.text,
    };
    if (generation.message !== undefined) {
        serializedValue.message = generation.message.toDict();
    }
    return serializedValue;
}
