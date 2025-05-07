// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'; 

const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// console.log(clerk_key);

if(!clerk_key){
  throw new Error("Key not found");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <ClerkProvider publishableKey = {clerk_key}>
    <App />
    </ClerkProvider>
  </StrictMode>
);

