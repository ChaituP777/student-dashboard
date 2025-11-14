import React, { useRef } from "react";
import StudentForm from "../components/StudentForm";
import { addStudent } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddStudent() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleAdd = async (data) => {
    try {
      await addStudent(data);
      toast.success("Student added");
      if (formRef.current) formRef.current.resetForm();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add");
    }
  };

  return (
    <div>
      <h3>Add Student</h3>
      <div className="card p-3">
        <StudentForm ref={formRef} onSubmit={handleAdd} submitLabel="Add Student" />
      </div>
    </div>
  );
}
