
// import React, { useState, useRef, useEffect } from 'react';
// import { Send } from 'lucide-react';

// const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);
  
//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() && !isLoading) {
//       onSendMessage(newMessage);
//       setNewMessage('');
//     }
//   };
  
//   return (
//     <div className="flex flex-col h-full bg-white">
//       {/* Messages area */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.map((message) => (
//           <div 
//             key={message.id} 
//             className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             {message.sender === 'ai' && (
//               <div className="flex-shrink-0 mr-2">
//                 <div className="w-8 h-8 rounded-full bg-safarOrange text-white flex items-center justify-center">
//                   AI
//                 </div>
//               </div>
//             )}
            
//             <div 
//               className={`rounded-lg px-4 py-2 max-w-[80%] ${
//                 message.sender === 'user' 
//                   ? 'bg-safarOrange text-white rounded-tr-none' 
//                   : 'bg-gray-100 text-gray-800 rounded-tl-none'
//               }`}
//             >
//               <p>{message.text}</p>
//               <p className="text-xs opacity-70 mt-1">
//                 {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </p>
//             </div>
            
//             {message.sender === 'user' && (
//               <div className="flex-shrink-0 ml-2">
//                 <div className="w-8 h-8 rounded-full bg-safarDark text-white flex items-center justify-center">
//                   U
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
        
//         {isLoading && (
//           <div className="flex justify-start mb-4">
//             <div className="flex-shrink-0 mr-2">
//               <div className="w-8 h-8 rounded-full bg-safarOrange text-white flex items-center justify-center">
//                 AI
//               </div>
//             </div>
//             <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none px-4 py-2">
//               <div className="flex space-x-1">
//                 <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                 <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//                 <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//       {/* Message input */}
//       <form 
//         onSubmit={handleSubmit}
//         className="border-t border-gray-200 p-4 flex items-center"
//       >
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Ask about travel destinations..."
//           className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-safarOrange"
//           disabled={isLoading}
//         />
//         <button
//           type="submit"
//           disabled={!newMessage.trim() || isLoading}
//           className={`ml-2 rounded-full p-2 ${
//             !newMessage.trim() || isLoading 
//               ? 'bg-gray-300 text-gray-500' 
//               : 'bg-safarOrange text-white hover:bg-orange-600'
//           } focus:outline-none transition-colors`}
//         >
//           <Send size={20} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;


import React, { useState, useRef, useEffect } from 'react';
import { Send, UserPlus, Mail } from 'lucide-react';
import { io } from 'socket.io-client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

// Socket connection
let socket;
try {
  socket = io('http://localhost:5000');
} catch (error) {
  console.error('Could not connect to socket server:', error);
}

// Generate a unique room ID if not available
const getChatRoomId = () => {
  let roomId = localStorage.getItem('safarbot_room_id');
  if (!roomId) {
    roomId = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('safarbot_room_id', roomId);
  }
  return roomId;
};

const ChatInterface = ({ messages, onSendMessage, isLoading, currentUser }) => {
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [participants, setParticipants] = useState([]);
  const messagesEndRef = useRef(null);
  const chatRoomId = getChatRoomId();
  const { toast } = useToast();
  
  // Combine props messages with local messages
  useEffect(() => {
    if (messages && messages.length > 0) {
      setLocalMessages(prev => {
        // Filter out duplicates by id
        const existingIds = new Set(prev.map(msg => msg.id));
        const newMessages = messages.filter(msg => !existingIds.has(msg.id));
        return [...prev, ...newMessages];
      });
    }
  }, [messages]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages, isLoading]);
  
  // Socket.io setup
  useEffect(() => {
    if (!socket || !currentUser) return;

    try {
      // Join chat room
      socket.emit('join_chat', chatRoomId, {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email
      });
      
      // Handle receiving messages
      const handleReceiveMessage = (data) => {
        if (data.sender !== currentUser.id) {
          setLocalMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'other',
            text: data.text,
            senderName: data.senderName,
            timestamp: new Date()
          }]);
        }
      };
      
      // Handle room participants update
      const handleParticipantsUpdate = (data) => {
        setParticipants(data);
      };

      socket.on('receive_message', handleReceiveMessage);
      socket.on('room_participants', handleParticipantsUpdate);
      
      return () => {
        socket.off('receive_message', handleReceiveMessage);
        socket.off('room_participants', handleParticipantsUpdate);
      };
    } catch (error) {
      console.error('Socket error:', error);
    }
  }, [chatRoomId, currentUser]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && !isLoading && currentUser) {
      // Create message object
      const messageData = {
        roomId: chatRoomId,
        sender: currentUser.id,
        senderName: currentUser.name,
        text: newMessage,
        timestamp: new Date()
      };
      
      // Add to local messages
      setLocalMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'user',
        text: newMessage,
        senderName: currentUser.name,
        timestamp: new Date()
      }]);
      
      // Send via socket if available
      try {
        if (socket) {
          socket.emit('send_message', messageData);
        }
      } catch (error) {
        console.error('Error sending message via socket:', error);
      }
      
      // Pass to parent component handler
      onSendMessage && onSendMessage(newMessage);
      
      // Clear input
      setNewMessage('');
    }
  };
  
  const handleInviteUser = () => {
    if (!inviteEmail.trim()) return;
    
    setIsInviting(true);
    
    // Create an invitation link that includes the room ID
    const invitationLink = `${window.location.origin}/planner?room=${chatRoomId}`;
    
    // In a production app, you would send this link via email
    // For now, we'll simulate a successful invitation
    
    setTimeout(() => {
      toast({
        title: "Invitation Sent",
        description: `An invitation has been sent to ${inviteEmail}`,
      });
      
      setInviteEmail('');
      setShowInviteDialog(false);
      setIsInviting(false);
    }, 1000);
    
    // Log the link for demo purposes
    console.log(`Invitation link for ${inviteEmail}: ${invitationLink}`);
  };
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat header with invite button and room ID */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold">Chat Room: {chatRoomId.slice(0, 8)}...</h3>
          <p className="text-sm text-gray-500">
            {participants.length} {participants.length === 1 ? 'person' : 'people'} in the room
          </p>
        </div>
        <button
          onClick={() => setShowInviteDialog(true)}
          className="bg-safarOrange text-white rounded-full p-2 hover:bg-orange-600 focus:outline-none transition-colors"
          aria-label="Invite user"
          title="Invite a user to this chat"
        >
          <UserPlus size={20} />
        </button>
      </div>
      
      {/* Invite user dialog */}
      {showInviteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={20} className="text-safarOrange" />
              <h3 className="text-xl font-semibold">Invite User</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Enter the email address of the user you want to invite to this chat.
            </p>
            
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowInviteDialog(false)}
                disabled={isInviting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleInviteUser}
                disabled={!inviteEmail.trim() || isInviting}
                className="bg-safarOrange hover:bg-orange-600"
              >
                {isInviting ? 'Sending...' : 'Send Invitation'}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {localMessages.map((message) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : message.sender === 'other' ? 'justify-start' : 'justify-start'}`}
          >
            {message.sender !== 'user' && (
              <div className="flex-shrink-0 mr-2">
                <div className="w-8 h-8 rounded-full bg-safarOrange text-white flex items-center justify-center">
                  {message.sender === 'ai' ? 'AI' : message.senderName?.charAt(0) || 'U'}
                </div>
              </div>
            )}
            
            <div 
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-safarOrange text-white rounded-tr-none' 
                  : message.sender === 'other'
                  ? 'bg-gray-200 text-gray-800 rounded-tl-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              {message.sender === 'other' && (
                <p className="text-xs font-semibold mb-1">{message.senderName || 'Unknown User'}</p>
              )}
              <p>{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            {message.sender === 'user' && (
              <div className="flex-shrink-0 ml-2">
                <div className="w-8 h-8 rounded-full bg-safarDark text-white flex items-center justify-center">
                  {currentUser?.name?.charAt(0) || 'U'}
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
      
      {/* Participants list */}
      {participants.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 mb-1">Active Participants:</p>
          <div className="flex flex-wrap gap-1">
            {participants.map(participant => (
              <span 
                key={participant.userId} 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800"
              >
                {participant.userName}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Message input */}
      <form 
        onSubmit={handleSubmit}
        className="border-t border-gray-200 p-4 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
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
