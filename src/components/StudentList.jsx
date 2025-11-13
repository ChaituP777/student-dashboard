import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await getStudents();
    setStudents(response.data);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div>
      <h2>🎓 Student Dashboard</h2>
      <button
        onClick={() => (window.location.href = "/add-student")}
        style={{ marginBottom: "10px" }}
      >
        ➕ Add New Student
      </button>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>College</th>
            <th>Qualification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
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
                <button
                  onClick={() => (window.location.href = `/edit-student/${s.id}`)}
                >
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(s.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
