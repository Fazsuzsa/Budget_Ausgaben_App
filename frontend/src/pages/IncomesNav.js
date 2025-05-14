import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Income from "./Income";
import Monthly_incomes from "./Monthly_incomes";
import { useParams } from "react-router-dom";
function IncomesNav() {
  const { user_id } = useParams();
  return (
    <>
      <Navbar />
      <Monthly_incomes user_id={user_id} />
      <Income user_id={user_id} />
    </>
  );
}

export default IncomesNav;
