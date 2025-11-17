import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QualificationForm from "../components/QualificationForm";
import { getStudents, updateStudent } from "../services/api";

export default function EditQualification() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await getStudents();
      const found = all.find((s) => s.id === id);

      if (found) {
        setStudent(found);

        const q = found.qualifications;
        setQualifications(
          q && q.length
            ? q
            : [
                {
                  college: "",
                  qualification: "",
                  yearPassing: "",
                  percentage: "",
                  startDate: "",
                  endDate: "",
                },
              ]
        );
      }
    };
    load();
  }, [id]);

  const handleSave = async () => {
    const updatedStudent = {
      ...student,
      qualifications,
    };

    await updateStudent(id, updatedStudent);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Edit Qualifications</h2>

        {student ? (
          <>
            <QualificationForm
              initial={qualifications}
              onChange={setQualifications}
            />

            <button className="btn btn-primary full-btn" onClick={handleSave}>
              Save Qualifications
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
