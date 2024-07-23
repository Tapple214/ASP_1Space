import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./app/home/Home";
import Login from "./app/login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
