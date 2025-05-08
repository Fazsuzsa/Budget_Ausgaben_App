import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Login from "./pages/Login";
import Eng_ger from "./components/Eng_ger";
import Dark_light from "./components/Dark_light";
import ExpensesNav from "./pages/ExpensesNav";
import IncomesNav from "./pages/IncomesNav";
import FormExpenses from "./pages/FormExpenses";
import PrivateRoute from "./components/PrivateRoute";
import MyForm from "./pages/MyForm";
import Expenses from "./components/Expenses";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
        <Route
          path="/expenses/:id"
          element={
            <PrivateRoute>
              {" "}
              <ExpensesNav></ExpensesNav>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/incomes/:id"
          element={
            <PrivateRoute>
              <IncomesNav></IncomesNav>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/test" element={<FormExpenses></FormExpenses>}></Route>
        <Route
          path="/edit-expense/:userId/:expenseId"
          element={<MyForm></MyForm>}
        ></Route>
        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              {" "}
              <Expenses />
            </PrivateRoute>
          }
        ></Route>
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
