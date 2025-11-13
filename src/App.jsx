import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Dashboard</Link>{" "}
        {" | "}
        <Link to="/add">Add Student</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

