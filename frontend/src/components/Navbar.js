import React from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        borderBottom: "1px solid #ccc",
        padding: "1.5rem 1.5rem", // 1 rem = 16 px it is a relative unit based on the fontsize
      }}
    >
      <img src={logo} style={{ height: "40px" }} />
      <Link to="/" style={styles.link}>
        Budget Manager
      </Link>
      <Link to="/expenses" style={styles.link}>
      <Link to={"/expenses/${user_id}"} style={styles.link}>
        Expenses
      </Link>
      <Link to="/incomes" style={styles.link}>
        Income
      </Link>
      <Link to="/login" style={styles.link}>
        LOGIN
      </Link>
      <Link to="/about" style={styles.link}>
        About ZENS
      </Link>
      <Link to="/eng_ger" style={styles.link}>
        English/German
      </Link>
      <Link to="/dark_light" style={styles.link}>
        Dark/Light
      </Link>
    </div>
  );
}

const styles = {
  link: {
    textDecoration: "none",
    color: "blue",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default Navbar;
