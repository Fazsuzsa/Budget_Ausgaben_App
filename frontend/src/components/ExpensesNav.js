import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Expenses from "./Expenses";
import Monthly_expenses from "./Monthly_expenses";

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
