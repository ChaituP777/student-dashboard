import React, { useRef } from "react";
import StudentForm from "../components/StudentForm";
import { addStudent } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();
  const formRef = useRef(null); // 👈 Reference to form

  const handleAdd = async (data) => {
    try {
      await addStudent(data);
      alert("✅ Student added successfully!");
      
      // 👇 Clear the form fields
      if (formRef.current) formRef.current.resetForm();

      // 👇 Redirect to dashboard
      navigate("/");

    } catch (error) {
      console.error("Error adding student:", error);
      alert("❌ Failed to add student.");
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      {/* 👇 Pass the ref to StudentForm */}
      <StudentForm ref={formRef} onSubmit={handleAdd} submitLabel="Add Student" />
    </div>
  );
}
