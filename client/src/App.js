import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./app/home/Home";
import Login from "./app/login/Login";
import FinancialOrganizer from './app/financial-organizer/FinancialOrganizer';
import BudgetHub from "./app/budgethub/budgethub";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/financial-organizer" element={<FinancialOrganizer />} />
      <Route path="/budgethub" element={<BudgetHub />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
