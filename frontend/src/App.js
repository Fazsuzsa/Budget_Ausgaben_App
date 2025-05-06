import React from "react";

import AddExpenseForm from "./AddExpense";
import Navbar from "./components/Navbar";
import sampleTable from "./assets/images/sampleTable.png";
import barChart from "./assets/images/barChart.png";
import pieChart from "./assets/images/pieChart.png";
import "./App.css";


const App = () => {
  return (
    <>
      <Navbar />
      <h1>Our Application for your budget administration</h1>

      <div>
        <h3>Expenses table for April</h3>
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
      {/* Button zum Einblenden des Formulars */}
      <AddExpenseForm />
    </>
  );
};

const styles = {
  chartContainer: {
    gap: "30px", // space between charts
  },
  chartBox: {
    textAlign: "center",
  },
};

export default App;
