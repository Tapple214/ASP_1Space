import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./app/home/Home";
import Login from "./app/login/Login";

import FinancialOrganizer from './app/financial-organizer/FinancialOrganizer';
import BudgetHub from "./app/budgethub/budgethub";
import TaskManager from "./app/task-manager/task-manager";
import { useAuth } from "./lib/data-access/auth/auth";

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  console.log(isAuthenticated);
  console.log(loading);

  if (loading) {
    // Loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children; // Render protected content if authenticated
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/financial-organizer" element={<FinancialOrganizer />} />
      <Route path="/budgethub" element={<BudgetHub />} />
      {/* Add other routes here */}
      <Route path="/" element={<Login />} />
      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financial-organizer"
        element={
          <ProtectedRoute>
            <FinancialOrganizer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/task-manager"
        element={
          <ProtectedRoute>
            <TaskManager />
          </ProtectedRoute>
        }
      />
      {/* Add other protected routes here */}
    </Routes>
  );
}

export default App;
