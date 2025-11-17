import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import EditQualification from "./pages/EditQualification"; // ← REQUIRED IMPORT

export default function App() {
  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link nav-active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? "nav-link nav-active" : "nav-link"
            }
          >
            Add New Student
          </NavLink>
        </div>
      </div>

      {/* PAGE ROUTES */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />

        {/* NEW ROUTE FOR QUALIFICATION EDITING */}
        <Route path="/edit-qualification/:id" element={<EditQualification />} />
      </Routes>
    </>
  );
}
