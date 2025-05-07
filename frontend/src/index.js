import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./components/About";
import Login from "./Login";
import Eng_ger from "./components/Eng_ger";
import Dark_light from "./components/Dark_light";
import Expenses from "./components/Expenses";
import Incomes from "./components/Incomes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
        <Route path="/expenses" element={<Expenses></Expenses>}></Route>
        <Route path="/incomes" element={<Incomes></Incomes>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/eng_ger" element={<Eng_ger></Eng_ger>}></Route>
        <Route path="/dark_light" element={<Dark_light></Dark_light>}></Route>

        {/*<Route path="/Expenses" element={<Expenses></Expenses>}></Route>
          <Route
            path="/Categories/:id"
            element={<Categories></Categories>}
          ></Route>
          <Route path="/incomes" element={<incomes></incomes>}></Route>
          <Route path="/Users/:id" element={<Users></Users>}></Route>*/}
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
