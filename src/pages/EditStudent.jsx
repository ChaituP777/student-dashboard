import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudents, updateStudent } from "../services/api";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await getStudents();
        const existing = all.find(s => s.id.toString() === id.toString());
        if (existing) setStudent(existing);
        else alert("Student not found");
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateStudent(id, data);
      alert("✅ Student updated successfully!");
      navigate("/"); // 👈 redirect to dashboard
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update student.");
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      {student ? (
        <StudentForm initial={student} onSubmit={handleUpdate} submitLabel="Update Student" />
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
}
