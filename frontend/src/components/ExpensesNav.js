import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Expenses from "./Expenses";
import Monthly_expenses from "./Monthly_expenses";

function ExpensesNav() {
  const { user_id } = useParams();

  return (
    <>
      <Navbar />
      <Monthly_expenses user_id={user_id} />
      <Expenses user_id={user_id} />
    </>
  );
}

export default ExpensesNav;
