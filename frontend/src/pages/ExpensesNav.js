import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Expenses from "../components/Expenses";
import Monthly_expenses from "../components/Monthly_expenses";

function ExpensesNav() {
  return (
    <>
      <Navbar />
      <Monthly_expenses />
      <Expenses />
    </>
  );
}

export default ExpensesNav;
