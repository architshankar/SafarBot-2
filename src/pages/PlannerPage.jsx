

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import ChatInterface from '../components/planner/ChatInterface';
// import MapInterface from '../components/planner/MapInterface';
// import { extractLocations } from '../utils/locationExtractor';

// const PlannerPage = () => {
//   const [messages, setMessages] = useState([
//     { 
//       id: 1, 
//       sender: 'ai', 
//       text: "Hi there! I'm SafarBot, your AI travel assistant. Where would you like to go on your next adventure?",
//       timestamp: new Date()
//     }
//   ]);
//   const [mapLocations, setMapLocations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendMessage = async (messageText) => {
//     if (!messageText.trim()) return;

//     const userMessage = {
//       id: messages.length + 1,
//       sender: 'user',
//       text: messageText,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setIsLoading(true);

//     setTimeout(() => {
//       const aiResponses = [
//         "I recommend checking out Goa! It's a beautiful coastal state in India with amazing beaches like Baga, Calangute, and Anjuna. You'll also find great restaurants like Thalassa and Gunpowder.",
//         "How about Kerala? It's known as 'God's Own Country' with stunning backwaters in Alleppey, hill stations like Munnar, and cities like Kochi with colonial architecture.",
//         "Rajasthan offers a rich cultural experience! Visit the Amber Fort in Jaipur, the blue city of Jodhpur, and enjoy authentic Rajasthani cuisine at Suvarna Mahal.",
//         "For a mountain getaway, Himachal Pradesh is perfect. Visit Shimla, Manali, or the less crowded Kasol. Don't miss trying local food at Café 1947 in Manali.",
//         "Agra is home to the magnificent Taj Mahal! While there, also check out Agra Fort and enjoy Mughlai cuisine at Peshawri."
//       ];

//       const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

//       const aiMessage = {
//         id: messages.length + 2,
//         sender: 'ai',
//         text: randomResponse,
//         timestamp: new Date()
//       };

//       setMessages(prev => [...prev, aiMessage]);

//       const locations = extractLocations(randomResponse);
//       setMapLocations(prev => [...prev, ...locations]);

//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
//       {/* Mobile header */}
//       <div className="md:hidden py-4 px-6 bg-gradient-to-r from-safarOrange to-orange-500 text-white">
//         <h1 className="text-xl font-bold">SafarBot Planner</h1>
//       </div>

//       {/* Chat panel */}
//       <div className="w-full md:w-1/2 flex flex-col h-full md:h-screen border-r border-gray-200">
//         <div className="hidden md:block bg-gradient-to-r from-safarOrange to-orange-500 p-4 text-white">
//           <Link to="/" className="text-xl font-bold hover:underline">
//             Chat with SafarBot
//           </Link>
//         </div>
//         <ChatInterface 
//           messages={messages} 
//           onSendMessage={handleSendMessage} 
//           isLoading={isLoading}
//         />
//       </div>

//       {/* Map panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-screen">
//         <MapInterface locations={mapLocations} />
//       </div>
//     </div>
//   );
// };

// export default PlannerPage;

// import React, { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import ChatInterface from '../components/planner/ChatInterface';
// import MapInterface from '../components/planner/MapInterface';
// import { extractLocations } from '../utils/locationExtractor';

// const PlannerPage = () => {
//   const [messages, setMessages] = useState([
//     { 
//       id: 1, 
//       sender: 'ai', 
//       text: "Hi there! I'm SafarBot, your AI travel assistant. Where would you like to go on your next adventure?",
//       timestamp: new Date()
//     }
//   ]);
//   const [mapLocations, setMapLocations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     // Initialize speech recognition
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       recognition.lang = 'en-US';
//       recognition.interimResults = false;
//       recognition.continuous = false;

//       recognition.onstart = () => setIsListening(true);
//       recognition.onend = () => setIsListening(false);

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         handleSendMessage(transcript);
//       };

//       recognitionRef.current = recognition;
//     } else {
//       console.warn("SpeechRecognition not supported in this browser.");
//     }
//   }, []);

//   const startListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.start();
//     }
//   };

//   const handleSendMessage = async (messageText) => {
//     if (!messageText.trim()) return;

//     const userMessage = {
//       id: messages.length + 1,
//       sender: 'user',
//       text: messageText,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setIsLoading(true);

//     setTimeout(() => {
//       const aiResponses = [
//         "I recommend checking out Goa! It's a beautiful coastal state in India with amazing beaches like Baga, Calangute, and Anjuna. You'll also find great restaurants like Thalassa and Gunpowder.",
//         "How about Kerala? It's known as 'God's Own Country' with stunning backwaters in Alleppey, hill stations like Munnar, and cities like Kochi with colonial architecture.",
//         "Rajasthan offers a rich cultural experience! Visit the Amber Fort in Jaipur, the blue city of Jodhpur, and enjoy authentic Rajasthani cuisine at Suvarna Mahal.",
//         "For a mountain getaway, Himachal Pradesh is perfect. Visit Shimla, Manali, or the less crowded Kasol. Don't miss trying local food at Café 1947 in Manali.",
//         "Agra is home to the magnificent Taj Mahal! While there, also check out Agra Fort and enjoy Mughlai cuisine at Peshawri."
//       ];

//       const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

//       const aiMessage = {
//         id: messages.length + 2,
//         sender: 'ai',
//         text: randomResponse,
//         timestamp: new Date()
//       };

//       setMessages(prev => [...prev, aiMessage]);

//       const locations = extractLocations(randomResponse);
//       setMapLocations(prev => [...prev, ...locations]);

//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
//       {/* Mobile header */}
//       <div className="md:hidden py-4 px-6 bg-gradient-to-r from-safarOrange to-orange-500 text-white">
//         <h1 className="text-xl font-bold">SafarBot Planner</h1>
//       </div>

//       {/* Chat panel */}
//       <div className="w-full md:w-1/2 flex flex-col h-full md:h-screen border-r border-gray-200">
//         <div className="hidden md:block bg-gradient-to-r from-safarOrange to-orange-500 p-4 text-white flex justify-between items-center">
//           <Link to="/" className="text-xl font-bold hover:underline">
//             Chat with SafarBot
//           </Link>
//           <button 
//             onClick={startListening}
//             className={`ml-4 p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-white'} text-black`}
//             title="Start voice input"
//           >
//             🎤
//           </button>
//         </div>
//         <ChatInterface 
//           messages={messages} 
//           onSendMessage={handleSendMessage} 
//           isLoading={isLoading}
//         />
//       </div>

//       {/* Map panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-screen">
//         <MapInterface locations={mapLocations} />
//       </div>
//     </div>
//   );
// };

// export default PlannerPage;


// import React, { useState, useRef, useEffect } from 'react';
// import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

// const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
//   const [input, setInput] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return;

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.continuous = false;

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
//       onSendMessage(transcript);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognitionRef.current = recognition;
//   }, [onSendMessage]);

//   const handleMicClick = () => {
//     if (!recognitionRef.current) return;

//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSendMessage(input);
//     setInput('');
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map(msg => (
//           <div key={msg.id} className={`text-${msg.sender === 'ai' ? 'left' : 'right'}`}>
//             <div className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'ai' ? 'bg-white text-black' : 'bg-blue-500 text-white'}`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message or use voice..."
//           className="flex-1 border rounded-full px-4 py-2 mr-2"
//         />
//         <button
//           type="button"
//           onClick={handleMicClick}
//           className={`text-white p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-gray-500'}`}
//         >
//           {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
//         </button>
//         <button
//           type="submit"
//           className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import MapInterface from '../components/planner/MapInterface';
import { extractLocations } from '../utils/locationExtractor';
import { RiVoiceAiFill , RiVoiceprintFill } from "react-icons/ri";

const PlannerPage = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: "Hi there! I'm SafarBot, your AI travel assistant. Where would you like to go on your next adventure?",
      timestamp: new Date()
    }
  ]);
  const [mapLocations, setMapLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
      setIsListening(false);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      
    };

    recognitionRef.current = recognition;
  }, []);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponses = [
        "I recommend checking out Goa! It's a beautiful coastal state in India with amazing beaches like Baga, Calangute, and Anjuna. You'll also find great restaurants like Thalassa and Gunpowder.",
        "How about Kerala? It's known as 'God's Own Country' with stunning backwaters in Alleppey, hill stations like Munnar, and cities like Kochi with colonial architecture.",
        "Rajasthan offers a rich cultural experience! Visit the Amber Fort in Jaipur, the blue city of Jodhpur, and enjoy authentic Rajasthani cuisine at Suvarna Mahal.",
        "For a mountain getaway, Himachal Pradesh is perfect. Visit Shimla, Manali, or the less crowded Kasol. Don't miss trying local food at Café 1947 in Manali.",
        "Agra is home to the magnificent Taj Mahal! While there, also check out Agra Fort and enjoy Mughlai cuisine at Peshawri."
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        text: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      const locations = extractLocations(randomResponse);
      setMapLocations(prev => [...prev, ...locations]);

      setIsLoading(false);
    }, 1500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden py-4 px-6 bg-gradient-to-r from-safarOrange to-orange-500 text-white">
        <h1 className="text-xl font-bold">SafarBot Planner</h1>
      </div>

      {/* Chat panel */}
      <div className="w-full md:w-1/2 flex flex-col h-full md:h-screen border-r border-gray-200">
        <div className="hidden md:block bg-gradient-to-r from-safarOrange to-orange-500 p-4 text-white">
          <Link to="/" className="text-xl font-bold hover:underline">
            Chat with SafarBot
          </Link>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-sm text-gray-500">SafarBot is typing...</div>}
        </div>

        {/* Input */}
        <form onSubmit={handleFormSubmit} className="flex items-center p-4 border-t bg-gray-50">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or speak your message..."
            className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="button"
            onClick={handleMicClick}
            className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-gray-300'} text-white mr-2`}
          >
            {isListening ? <RiVoiceAiFill /> : <RiVoiceprintFill className="bg-black text-white p-1 rounded-full" size={24}/>}
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </form>
      </div>

      {/* Map panel */}
      <div className="w-full md:w-1/2 h-1/2 md:h-screen">
        <MapInterface locations={mapLocations} />
      </div>
    </div>
  );
};

export default PlannerPage;
