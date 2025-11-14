import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudent, updateStudent } from "../services/api";
import { toast } from "react-toastify";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getStudent(id);
        setStudent(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load student");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateStudent(id, data);
      toast.success("Student updated");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) return <div><p>Loading...</p></div>;

  return (
    <div>
      <h3>Edit Student</h3>
      <div className="card p-3">
        <StudentForm initial={student} onSubmit={handleUpdate} submitLabel="Update Student" />
      </div>
    </div>
  );
}
