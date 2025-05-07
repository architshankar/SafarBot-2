
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && !isLoading) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="flex-shrink-0 mr-2">
                <div className="w-8 h-8 rounded-full bg-safarOrange text-white flex items-center justify-center">
                  AI
                </div>
              </div>
            )}
            
            <div 
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-safarOrange text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            {message.sender === 'user' && (
              <div className="flex-shrink-0 ml-2">
                <div className="w-8 h-8 rounded-full bg-safarDark text-white flex items-center justify-center">
                  U
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex-shrink-0 mr-2">
              <div className="w-8 h-8 rounded-full bg-safarOrange text-white flex items-center justify-center">
                AI
              </div>
            </div>
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none px-4 py-2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <form 
        onSubmit={handleSubmit}
        className="border-t border-gray-200 p-4 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask about travel destinations..."
          className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-safarOrange"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || isLoading}
          className={`ml-2 rounded-full p-2 ${
            !newMessage.trim() || isLoading 
              ? 'bg-gray-300 text-gray-500' 
              : 'bg-safarOrange text-white hover:bg-orange-600'
          } focus:outline-none transition-colors`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
