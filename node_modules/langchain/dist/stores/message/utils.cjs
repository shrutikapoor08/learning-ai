"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapChatMessagesToStoredMessages = exports.mapStoredMessagesToChatMessages = void 0;
const index_js_1 = require("../../schema/index.cjs");
/**
 * Transforms an array of `StoredMessage` instances into an array of
 * `BaseMessage` instances. It uses the `mapV1MessageToStoredMessage`
 * function to ensure all messages are in the `StoredMessage` format, then
 * creates new instances of the appropriate `BaseMessage` subclass based
 * on the type of each message. This function is used to prepare stored
 * messages for use in a chat context.
 */
function mapStoredMessagesToChatMessages(messages) {
    return messages.map(index_js_1.mapStoredMessageToChatMessage);
}
exports.mapStoredMessagesToChatMessages = mapStoredMessagesToChatMessages;
/**
 * Transforms an array of `BaseMessage` instances into an array of
 * `StoredMessage` instances. It does this by calling the `toDict` method
 * on each `BaseMessage`, which returns a `StoredMessage`. This function
 * is used to prepare chat messages for storage.
 */
function mapChatMessagesToStoredMessages(messages) {
    return messages.map((message) => message.toDict());
}
exports.mapChatMessagesToStoredMessages = mapChatMessagesToStoredMessages;
