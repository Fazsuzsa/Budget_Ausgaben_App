import React from "react";
import Navbar from "./components/Navbar";
import sampleTable from "./assets/images/sampleTable.png";
import barChart from "./assets/images/barChart.png";
import pieChart from "./assets/images/pieChart.png";

const mystyle = {
  // flex: 1,
  //display: flex,
  //flexdirection: column,
  //alignitems:
  // justifycontent: center,
  //padding: 20,
};

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <h1> Our Application for your budget administration</h1>
      <div>
        <h3> Expenses table for April </h3>
        <img src={sampleTable} alt="Expenses table for April" />
      </div>
      <div container charts styles={mystyle}></div>
      <h3> comparison expenses categories </h3>
      <div>
        <img src={pieChart} alt="comparison expenses categories " />
      </div>
      <h3> Expenses statistis </h3>
      <div>
        <img src={barChart} alt="Expenses statistis" />
      </div>
    </>
  );
};

export default App;
