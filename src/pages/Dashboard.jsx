import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent, updateStudent } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getStudents();
    setStudents(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Flatten qualifications and include index for delete option
  const qualificationRows = students.flatMap((s) => {
    const quals = s.qualifications || [];

    if (!quals.length) {
      return [
        {
          studentId: s.id,
          name: `${s.firstName} ${s.lastName}`,
          college: "N/A",
          qualification: "N/A",
          yearPassing: "N/A",
          percentage: "N/A",
          duration: "N/A",
          index: null,
        },
      ];
    }

    return quals.map((q, index) => ({
      studentId: s.id,
      name: `${s.firstName} ${s.lastName}`,
      college: q.college || "N/A",
      qualification: q.qualification || "N/A",
      yearPassing: q.yearPassing || "N/A",
      percentage: q.percentage || "N/A",
      duration:
        q.startDate && q.endDate ? `${q.startDate} → ${q.endDate}` : "N/A",
      index,
    }));
  });

  const handleDeleteQualification = async (studentId, qIndex) => {
    if (qIndex === null) return;

    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const updatedQualifications = student.qualifications.filter(
      (_, i) => i !== qIndex
    );

    const updatedStudent = {
      ...student,
      qualifications: updatedQualifications,
    };

    await updateStudent(studentId, updatedStudent);
    fetchData();
  };

  return (
    <div className="container">

      {/* STUDENT TABLE */}
      <div className="card">
        <h1>Student Dashboard</h1>

        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Add New Student
        </button>

        <table className="table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>DOB</th>
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

                <td className="action-btns">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/edit/${s.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={async () => {
                      await deleteStudent(s.id);
                      fetchData();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* QUALIFICATION TABLE */}
      <div className="card" style={{ marginTop: "30px" }}>
        <h2>Education Qualifications</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>College</th>
              <th>Qualification</th>
              <th>Year</th>
              <th>Percentage / CGPA</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {qualificationRows.map((r, i) => (
              <tr key={i}>
                <td>{r.studentId}</td>
                <td>{r.name}</td>
                <td>{r.college}</td>
                <td>{r.qualification}</td>
                <td>{r.yearPassing}</td>
                <td>{r.percentage}</td>
                <td>{r.duration}</td>

                <td className="action-btns">

                  {/* Edit (enabled only if qualification exists) */}
                  <button
                    className="btn btn-primary"
                    disabled={r.index === null}
                    onClick={() =>
                      navigate(`/edit-qualification/${r.studentId}`)
                    }
                  >
                    Edit
                  </button>

                  {/* Delete (enabled only if qualification exists) */}
                  <button
                    className="btn btn-danger"
                    disabled={r.index === null}
                    onClick={() =>
                      handleDeleteQualification(r.studentId, r.index)
                    }
                  >
                    Delete
                  </button>

                  {/* Add (always enabled) */}
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate(`/edit-qualification/${r.studentId}`)
                    }
                  >
                    Add
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
