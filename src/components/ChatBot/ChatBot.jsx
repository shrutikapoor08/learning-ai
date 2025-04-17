import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Send, User, Bot } from "lucide-react";

/**
 * A reusable ChatBot component that handles message display and user input
 * 
 * @param {Object} props
 * @param {Array} props.messages - Array of message objects with role and content
 * @param {Function} props.onSendMessage - Function to call when user sends a message
 * @param {string} props.placeholder - Placeholder text for the input field
 * @param {boolean} props.isLoading - Whether the bot is currently processing
 * @param {string} props.botName - Name to display for the bot (default: "Assistant")
 * @param {number} props.maxHeight - Maximum height for the chat container (default: 400px)
 */
const ChatBot = ({
  messages = [],
  onSendMessage,
  placeholder = "Type a message...",
  isLoading = false,
  botName = "Assistant",
  maxHeight = 400,
}) => {
  const [userInput, setUserInput] = useState("");
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom of chat when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    
    onSendMessage(userInput);
    setUserInput("");
  };

  return (
    <div className="flex flex-col w-full h-full border rounded-lg shadow-sm overflow-hidden">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Start a conversation!
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
            >
              <div 
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  message.role === "user" 
                    ? "bg-blue-500 text-white rounded-tr-none" 
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === "user" ? (
                    <>
                      <span className="font-medium">You</span>
                      <User className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-1" />
                      <span className="font-medium">{botName}</span>
                    </>
                  )}
                </div>
                <p className="whitespace-pre-wrap">
                  {message.isLoading ? (
                    <span className="animate-pulse">Thinking...</span>
                  ) : (
                    message.content
                  )}
                </p>
              </div>
            </div>
          ))
        )}
        {isLoading && messages.length > 0 && !messages[messages.length - 1].isLoading && (
          <div className="text-center py-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce mr-1"></span>
            <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce mr-1" style={{ animationDelay: "0.2s" }}></span>
            <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
          </div>
        )}
      </div>
      
      <div className="border-t p-2 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="rounded-l-none"
            disabled={!userInput.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;