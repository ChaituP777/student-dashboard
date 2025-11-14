import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // your global styles
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  </React.StrictMode>
);
