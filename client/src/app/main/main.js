import React, { useState } from "react";
import { Col } from "react-bootstrap";
import NavBar from "../../components/navbar/navbar";
import "../main/main.css";

// Pages
import FinanceBoard from "../financial-board/Financial-board";
import BudgetHub from "../budgethub/budgethub";
import TaskManager from "../task-manager/task-manager";
import Help from "../help/help";
import Home from "../home/Home";

// Page mapping
const pageComponents = {
  dashboard: Home,
  "budget-hub": BudgetHub,
  "task-manager": TaskManager,
  "finance-board": FinanceBoard,
  help: Help,
};

export default function MainDisplay() {
  // Navbar management
  const [isOpen, setIsOpen] = useState(false);
  const [homeFinanceData, setHomeFinanceData] = useState({
    income: 0,
    monthBudget: 0,
    rent: 0,
    debt: 0,
    invest: 0,
    others: 0,
  });

  const toggleNavbar = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Page handling
  const [pageName, setPageName] = useState("dashboard");

  const handlePageChange = (page) => {
    setPageName(page);
  };

  // Get the component for the current page based on navbar click
  const PageComponent = pageComponents[pageName] || null;

  const pageProps = {
    isOpen: pageName === "budget-hub" ? isOpen : undefined,
    handlePageChange: pageName === "dashboard" ? handlePageChange : undefined,
    homeFinanceData: pageName === "dashboard" ? homeFinanceData : undefined,
    setHomeFinanceData:
      pageName === "finance-board" ? setHomeFinanceData : undefined,
  };

  return (
    <Col className="d-flex flex-row">
      <NavBar
        handlePageChange={handlePageChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleNavbar={toggleNavbar}
      />
      <div
        className="w-100 h-auto"
        style={{
          marginLeft: isOpen ? "170px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        {PageComponent && <PageComponent {...pageProps} />}
      </div>
    </Col>
  );
}
