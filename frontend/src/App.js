import React from "react";
import Navbar from "./components/Navbar";
import PieChart from "./components/PieChart";
import { Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar></Navbar>
      <PieChart></PieChart>
    </>
  );
}
export default App;
