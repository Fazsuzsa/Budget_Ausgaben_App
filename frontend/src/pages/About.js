import React from "react";
import Navbar from "../components/Navbar";
import sampleTable from "../assets/images/sampleTable.png";
import barChart from "../assets/images/barChart.png";
import pieChart from "../assets/images/pieChart.png";
import { Navigate } from "react-router-dom";

function About() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar></Navbar>
      <h1 style={{ color: "red" }}>ZENS: About us (Work in progress ...)</h1>
      <br />
      <h1>Our Application for your budget administration</h1>
      <br />

      <div>
        <h3>Expenses table for April:</h3>
        <br />
        <img
          src={sampleTable}
          alt="Expenses table for April"
          style={{ marginBottom: "30px" }}
        />
      </div>

      <div style={styles.chartContainer}>
        <div style={styles.chartBox}>
          <h3>Comparison expenses categories</h3>
          <img src={pieChart} alt="comparison expenses categories" />
        </div>
        <div style={styles.chartBox}>
          <h3>Expenses statistics</h3>
          <img src={barChart} alt="Expenses statistics" />
        </div>
      </div>
    </>
  );
}

const styles = {
  chartContainer: {
    display: "flex", // enable flex layout
    flexDirection: "row", // row = side-by-side
    justifyContent: "left",
    gap: "30px", // space between the charts
    flexWrap: "wrap", // allow wrap on smaller screens
    marginTop: "20px",
  },
  chartBox: {
    textAlign: "center",
    maxWidth: "400px", // optional: control width
  },
};

export default About;
