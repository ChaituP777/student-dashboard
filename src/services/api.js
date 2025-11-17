import axios from "axios";
import { encryptData, decryptData } from "../utils/crypto";

const BASE = "http://localhost:7000/students";

// GET
export const getStudents = async () => {
  const res = await axios.get(BASE);
  return decryptData(res.data);
};

// POST
export const addStudent = async (student) => {
  const encrypted = encryptData(student);
  const res = await axios.post(BASE, encrypted);
  return decryptData(res.data);
};

// PUT
export const updateStudent = async (id, student) => {
  const encrypted = encryptData(student);
  const res = await axios.put(`${BASE}/${id}`, encrypted);
  return decryptData(res.data);
};

// DELETE
export const deleteStudent = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`);
  return decryptData(res.data);
};
