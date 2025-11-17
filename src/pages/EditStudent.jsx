import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudents, updateStudent } from "../services/api";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const all = await getStudents();
      const found = all.find((s) => s.id === id);

      if (found) {
        setStudent(found);
        setUpdatedStudent(found);
      }
    };

    load();
  }, [id]);

  const handleSave = async () => {
    await updateStudent(id, updatedStudent);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Edit Student Details</h2>

        {student ? (
          <>
            <StudentForm
              initial={student}
              onChange={(data) => setUpdatedStudent(data)}
            />

            <button
              className="btn btn-primary full-btn"
              onClick={handleSave}
              style={{ marginTop: "20px" }}
            >
              Save Student Details
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
