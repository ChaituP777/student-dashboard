import axios from "axios";

const API_URL = "http://localhost:5000/students";

// ✅ Get all students
export const getStudents = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// ✅ Add a new student
export const addStudent = async (student) => {
  // return the response (important!)
  return await axios.post(API_URL, student);
};

// ✅ Delete student
export const deleteStudent = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

// ✅ Update student
export const updateStudent = async (id, student) => {
  return await axios.put(`${API_URL}/${id}`, student);
};
