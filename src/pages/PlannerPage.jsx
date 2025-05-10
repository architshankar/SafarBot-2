

// import React, { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
// import MapInterface from '../components/planner/MapInterface';
// import { extractLocations } from '../utils/locationExtractor';
// import { RiVoiceAiFill , RiVoiceprintFill } from "react-icons/ri";

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
//   const [input, setInput] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return;

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => setIsListening(true);
//     recognition.onend = () => setIsListening(false);
//     recognition.onerror = (e) => {
//       console.error('Speech recognition error:', e.error);
//       setIsListening(false);
//     };
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
      
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   const handleMicClick = () => {
//     if (recognitionRef.current) {
//       if (isListening) {
//         recognitionRef.current.stop();
//       } else {
//         recognitionRef.current.start();
//       }
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

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     handleSendMessage(input);
//     setInput('');
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

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
//           {messages.map((msg) => (
//             <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           {isLoading && <div className="text-sm text-gray-500">SafarBot is typing...</div>}
//         </div>

//         {/* Input */}
//         <form onSubmit={handleFormSubmit} className="flex items-center p-4 border-t bg-gray-50">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type or speak your message..."
//             className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//           />
//           <button
//             type="button"
//             onClick={handleMicClick}
//             className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-gray-300'} text-white mr-2`}
//           >
//             {isListening ? <RiVoiceAiFill /> : <RiVoiceprintFill className="bg-black text-white p-1 rounded-full" size={24}/>}
//           </button>
//           <button
//             type="submit"
//             className="bg-orange-500 text-white px-4 py-2 rounded-full"
//           >
//             Send
//           </button>
//         </form>
//       </div>

//       {/* Map panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-screen">
//         <MapInterface locations={mapLocations} />
//       </div>
//     </div>
//   );
// };

// export default PlannerPage;
import React, { useState, useEffect } from 'react';
import ChatInterface from '../components/planner/ChatInterface';
import MapInterface from '../components/planner/MapInterface';
import { extractLocations } from '../utils/locationExtractor';
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

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
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(true);
  
  useEffect(() => {
    // Check if user already exists in localStorage
    const savedUser = localStorage.getItem('safarbot_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setShowUserForm(false);
    }
  }, []);
  
  const handleUserSubmit = (event) => {
    event.preventDefault();
    const name = event.target.username.value.trim();
    const email = event.target.email.value.trim();
    
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Please enter both name and email",
        variant: "destructive"
      });
      return;
    }
    
    const user = {
      id: uuidv4(),
      name,
      email
    };
    
    localStorage.setItem('safarbot_user', JSON.stringify(user));
    setCurrentUser(user);
    setShowUserForm(false);
    
    toast({
      title: "Success",
      description: "You're now signed in!",
    });
  };
  
  // Function to handle sending a new message
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
      userName: currentUser?.name || 'User'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
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
      
      // Extract locations from AI response
      const locations = extractLocations(randomResponse);
      setMapLocations(prev => [...prev, ...locations]);
      
      setIsLoading(false);
    }, 1500);
  };

  // If user hasn't provided their information yet
  if (showUserForm) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign in to SafarBot</h1>
          <form onSubmit={handleUserSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-safarOrange"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-safarOrange"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-safarOrange to-orange-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
            >
              Start Chatting
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden py-4 px-6 bg-gradient-to-r from-safarOrange to-orange-500 text-white">
        <h1 className="text-xl font-bold">SafarBot Planner</h1>
      </div>
      
      {/* Chat panel */}
      <div className="w-full md:w-1/2 flex flex-col h-full md:h-screen border-r border-gray-200">
        <div className="hidden md:block bg-gradient-to-r from-safarOrange to-orange-500 p-4 text-white">
          <h2 className="text-xl font-bold">Chat with SafarBot</h2>
        </div>
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          currentUser={currentUser}
        />
      </div>
      
      {/* Map panel */}
      <div className="w-full md:w-1/2 h-1/2 md:h-screen">
        <MapInterface locations={mapLocations} />
      </div>
    </div>
  );
};

export default PlannerPage;
