import React, { useRef, useState } from "react";
import StudentForm from "../components/StudentForm";
import QualificationForm from "../components/QualificationForm";
import { addStudent } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({});
  const [qualifications, setQualifications] = useState([]);

  const handleSubmit = async () => {
    if (!qualifications.length) {
      alert("Please add at least one qualification.");
      return;
    }

    const finalData = {
      ...student,
      qualifications,
    };

    await addStudent(finalData);
    navigate("/");
  };

  return (
    <div className="container">
      <StudentForm onChange={setStudent} />

      <div className="card" style={{ marginTop: "20px" }}>
        <h2>Education Qualifications</h2>
        <QualificationForm onChange={setQualifications} />
      </div>

      <button className="btn btn-primary full-btn" onClick={handleSubmit}>
        Save Student
      </button>
    </div>
  );
}
