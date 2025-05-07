import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Income from "./Income";
import Monthly_incomes from "./Monthly_incomes";

function IncomesNav() {
  return (
    <>
      <Navbar />
      <Income />
      <Monthly_incomes />
    </>
  );
}

export default IncomesNav;
