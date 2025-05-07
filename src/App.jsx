import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlannerPage from "./pages/PlannerPage";
import { SignIn, SignUp } from '@clerk/clerk-react';
import LoginPage from './pages/Signin';
import SignupPage from './pages/Register';
import ItineraryPage from './pages/itineraryPlanner';

// Create a client for React Query
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage/>} />
          <Route path='register' element={< SignupPage />} />
          {/* <Route path='signup' element={} /> */}

          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/" element={<Index />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
