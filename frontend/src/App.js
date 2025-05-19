import React from "react";
import Navbar from "./components/Navbar";
import PieChart from "./components/PieChart";
import InExBarChart from "./components/InExBarChart";

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
      <div className="flex flex-row gap-2 p-4">
        <div className="w-1/2">
          <PieChart></PieChart>
        </div>
        <div className="w-1/2">
          <InExBarChart></InExBarChart>
        </div>
      </div>
    </>
  );
}
export default App;
