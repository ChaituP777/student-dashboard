import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // 👈 React Router navigation

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents(); // reload list
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <h2>🎓 Student Dashboard</h2>

      {/* 👇 React Router navigation instead of window.location.href */}
      <button
        onClick={() => navigate("/add")}
        style={{ marginBottom: "10px" }}
      >
        ➕ Add New Student
      </button>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>College</th>
            <th>Qualification</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan="9">No students found</td>
            </tr>
          )}

          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.mobile}</td>
              <td>{s.dob}</td>
              <td>{s.college}</td>
              <td>{s.qualification}</td>

              <td>
                {/* 👇 Edit using React Router */}
                <button onClick={() => navigate(`/edit/${s.id}`)}>
                  ✏️ Edit
                </button>

                <button onClick={() => handleDelete(s.id)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  