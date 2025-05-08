import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Income from "../components/Income";
import Monthly_incomes from "../components/Monthly_incomes";

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
