import axios from "axios";

const API_URL = "http://localhost:5000/students";

export const getStudents = async () => {
  const res = await axios.get(API_URL);
  return res.data; // returns array
};

export const getStudent = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const addStudent = async (student) => {
  const res = await axios.post(API_URL, student);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const updateStudent = async (id, student) => {
  const res = await axios.put(`${API_URL}/${id}`, student);
  return res.data;
};

export default {
  getStudents,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent,
};
