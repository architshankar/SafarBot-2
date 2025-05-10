// import React, { useState, useEffect } from 'react';
// import { PlusCircle } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// const ChatSelection = ({ onSelectChat }) => {
//   const [chats, setChats] = useState([]);
//   const [isCreatingChat, setIsCreatingChat] = useState(false);
//   const [newChatName, setNewChatName] = useState('');
//   const [currentUser, setCurrentUser] = useState(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     // Get user from localStorage
//     const savedUser = localStorage.getItem('safarbot_user');
//     if (savedUser) {
//       setCurrentUser(JSON.parse(savedUser));
//       fetchUserChats(JSON.parse(savedUser).id);
//     }
//   }, []);

//   const fetchUserChats = async (userId) => {
//     if (!userId) return;
    
//     try {
//       // Simulate fetching chats
//       // In a real app, this would be an API call to your backend
//       setTimeout(() => {
//         const mockChats = [
//           { _id: 'chat1', name: 'Trip to Goa', createdAt: new Date() },
//           { _id: 'chat2', name: 'Thailand Adventure', createdAt: new Date() }
//         ];
//         setChats(mockChats);
//       }, 500);
//     } catch (error) {
//       console.error('Error fetching chats:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load chats",
//         variant: "destructive"
//       });
//     }
//   };

//   const handleCreateChat = async () => {
//     if (!newChatName.trim() || !currentUser) return;

//     try {
//       // Generate a unique ID for the new chat
//       const newChatId = 'chat' + Date.now();
      
//       // Create a new chat object
//       const newChat = {
//         _id: newChatId,
//         name: newChatName,
//         createdAt: new Date(),
//         createdBy: currentUser.id
//       };
      
//       // Add to local state
//       setChats(prev => [...prev, newChat]);
//       setNewChatName('');
//       setIsCreatingChat(false);
      
//       // Show success message
//       toast({
//         title: "Success",
//         description: "Chat created successfully",
//       });
//     } catch (error) {
//       console.error('Error creating chat:', error);
//       toast({
//         title: "Error",
//         description: "Failed to create chat",
//         variant: "destructive"
//       });
//     }
//   };

//   return (
//     <div className="border-r border-gray-200 p-4 h-full bg-white">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Your Chats</h2>
//         <button
//           onClick={() => setIsCreatingChat(true)}
//           className="text-safarOrange hover:text-orange-600"
//         >
//           <PlusCircle size={24} />
//         </button>
//       </div>

//       {/* Create new chat dialog */}
//       {isCreatingChat && (
//         <div className="mb-4 p-3 border border-gray-200 rounded-lg">
//           <input
//             type="text"
//             value={newChatName}
//             onChange={(e) => setNewChatName(e.target.value)}
//             placeholder="Chat name"
//             className="w-full mb-2 p-2 border border-gray-300 rounded"
//           />
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => setIsCreatingChat(false)}
//               className="px-3 py-1 text-sm bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleCreateChat}
//               className="px-3 py-1 text-sm bg-safarOrange text-white rounded"
//             >
//               Create
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Chat list */}
//       <div className="space-y-2">
//         {chats.length === 0 ? (
//           <p className="text-gray-500 text-center py-4">No chats yet. Create one to get started!</p>
//         ) : (
//           chats.map(chat => (
//             <button
//               key={chat._id}
//               onClick={() => onSelectChat(chat._id)}
//               className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <p className="font-medium truncate">{chat.name}</p>
//               <p className="text-xs text-gray-500">
//                 {new Date(chat.createdAt).toLocaleDateString()}
//               </p>
//             </button>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatSelection;
