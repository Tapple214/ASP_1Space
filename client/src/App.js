import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./app/login/Login";
import Main from "./app/main/main";

import { useAuth } from "./lib/data-access/auth/auth";

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Unprotected route here */}
      <Route path="/" element={<Login />} />

      {/* Protected Route */}
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
