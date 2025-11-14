import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/api";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const doDelete = async () => {
    try {
      await deleteStudent(deleteId);
      toast.success("Student deleted");
      setIsModalOpen(false);
      setDeleteId(null);
      setStudents((s) => s.filter((x) => x.id !== deleteId));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="p-4 shadow-lg rounded-4 bg-white w-100" style={{ maxWidth: "1100px" }}>
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary mb-0">📘 Student Dashboard</h2>

          <button
            className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2"
            onClick={() => navigate("/add")}
          >
            <span style={{ fontSize: "1.2rem" }}>＋</span>
            Add New Student
          </button>
        </div>

        {/* Table Section */}
        {loading ? (
          <Skeleton height={30} count={6} />
        ) : (
          <div className="table-responsive">
            <table className="table table-hover text-center align-middle">
              <thead className="table-primary">
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
                    <td colSpan="9" className="text-muted py-4">
                      No students found
                    </td>
                  </tr>
                )}

                {students.map((s) => (
                  <tr key={s.id}>
                    <td className="fw-semibold">{s.id}</td>
                    <td>{s.firstName}</td>
                    <td>{s.lastName}</td>
                    <td>{s.email}</td>
                    <td>{s.mobile}</td>
                    <td>{s.dob}</td>
                    <td>{s.college}</td>
                    <td>{s.qualification}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => navigate(`/edit/${s.id}`)}
                      >
                        ✏ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => confirmDelete(s.id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            content: {
              maxWidth: "400px",
              margin: "auto",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
            },
          }}
        >
          <h4 className="fw-bold mb-3">Confirm Delete</h4>
          <p className="text-muted">Are you sure you want to remove this student?</p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-secondary px-4" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-danger px-4" onClick={doDelete}>
              Delete
            </button>
          </div>
        </Modal>

      </div>
    </div>
  );
}
