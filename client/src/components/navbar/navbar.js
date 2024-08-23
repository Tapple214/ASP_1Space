import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../navbar/navbar.css";
import logo from "../navbar/logo.png";

import ModalPopup from "../modal/modal";

// TODO: add this to app and use conditionals instead to toggle between different pages to prevent navbar from closing

export default function NavBar({ isOpen, toggleNavbar, handlePageChange }) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={`navbar-container ${isOpen ? "navbar-open" : ""}`}>
      <div className="cover-layer" onClick={toggleNavbar}>
        <Button
          variant="dark"
          onClick={toggleNavbar}
          className={`toggle-button p-0 py-1 rounded-3 ${
            isOpen ? "open" : "close"
          }`}
        >
          <img className="logo" src={logo} alt="logo" />
        </Button>

        <div className="icon-widget-container">
          <div className="help icon-widget d-flex justify-content-center align-items-center mb-2 rounded-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-question-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"
              />
            </svg>
          </div>

          <div className="dashboard icon-widget d-flex justify-content-center align-items-center mb-4 rounded-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-ui-checks-grid"
              viewBox="0 0 16 16"
            >
              <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z" />
            </svg>
          </div>

          <div className="task-manager icon-widget d-flex justify-content-center align-items-center mb-2 rounded-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-list-check"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
              />
            </svg>
          </div>

          <div className="finance-organizer icon-widget d-flex justify-content-center align-items-center mb-2 rounded-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-cash-coin"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
              />
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
            </svg>
          </div>

          <div className="budget-hub icon-widget d-flex justify-content-center align-items-center mb-2 rounded-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-piggy-bank-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595m7.173 3.876a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199m-8.999-.65a.5.5 0 1 1-.276-.96A7.6 7.6 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.6 6.6 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0" />
            </svg>
          </div>

          <div
            className="logout icon-widget d-flex justify-content-center align-items-center mb-4 ms-2 rounded-3 fixed-bottom"
            onClick={handleShow}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-rocket-takeoff-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.6 3.6 0 0 0-.108-.563 2 2 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2 2 0 0 0-.16-.045 4 4 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.55 2.55 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361s.437 1.732-.36 2.531Z" />
              <path d="M5.205 10.787a7.6 7.6 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`navbar flex-column py-4 ${isOpen ? "open" : ""}`}>
        <div
          onClick={() => handlePageChange("dashboard")}
          id="oneSpace"
          className="oneSpace py-0 pt-1 m-0"
        >
          <h5 className="fw-bold me-3">1Space</h5>
        </div>

        <div className="nav-links">
          <div
            onClick={() => handlePageChange("help")}
            className="nav-link-help mb-2 ps-4 mt-2"
            style={{ cursor: "pointer" }}
          >
            Help
          </div>
          <div
            onClick={() => handlePageChange("dashboard")}
            className="nav-link-dashboard mb-4 ps-4 mt-4"
            style={{ cursor: "pointer" }}
          >
            Dashboard
          </div>
          <div
            onClick={() => handlePageChange("task-manager")}
            className="nav-link-task mb-2 ps-4 pt-3"
            style={{ cursor: "pointer" }}
          >
            Task Manager
          </div>
          <div
            onClick={() => handlePageChange("finance-board")}
            className="nav-link-finance mb-2 ps-4 mt-4"
            style={{ cursor: "pointer" }}
          >
            Finance Board
          </div>
          <div
            onClick={() => handlePageChange("budget-hub")}
            className=" nav-link-budget mb-2 ps-4 mt-4"
            style={{ cursor: "pointer" }}
          >
            Budget Hub
          </div>
        </div>

        {/* <div className="d-flex align-items-center w-100 pe-3">
          <div
            className="logout-btn rounded-4 w-100 ms-5 p-2"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <div className="ps-3">Logout</div>
          </div>
        </div> */}

        <ModalPopup
          type="logout"
          showModal={show}
          handleCloseModal={handleClose}
          title={<p className="fw-bold text-center m-0">Confirm Logout</p>}
          content={<>Are you sure you would like to logout?</>}
        />
      </div>
    </div>
  );
}
