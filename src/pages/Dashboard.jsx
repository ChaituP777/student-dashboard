import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents(); // ✅ FIXED HERE
      setStudents(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      setStudents(s => s.filter(x => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <button onClick={() => navigate("/add")}>➕ Add New Student</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: 12, width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Mobile</th><th>DOB</th><th>College</th><th>Qualification</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && <tr><td colSpan="9">No students found</td></tr>}
            {students.map(s => (
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
                  <button onClick={() => navigate(`/edit/${s.id}`)}>✏️ Edit</button>
                  <button style={{ marginLeft: 8 }} onClick={() => handleDelete(s.id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
