import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import "./App.css";

export default function App() {
  return (
    <div className="app-wrapper">

      {/* TOP NAVBAR */}
      <nav className="navbar-container">
        <div className="nav-inner">

          <Link
            to="/"
            className="nav-btn"
          >
            Dashboard
          </Link>

          <Link
            to="/add"
            className="nav-btn"
          >
            Add Student
          </Link>

        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </div>

    </div>
  );
}
