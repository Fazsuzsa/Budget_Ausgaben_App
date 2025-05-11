import React from "react";
//import logo from "../assets/images/logo.svg";
import logo from "../assets/images/AppIcon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const user_name = user?.e_mail;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        borderBottom: "1px solid #ccc",
        padding: "1.5rem 1.5rem", // 1 rem = 16 px it is a relative unit based on the fontsize
      }}
    >
      <img src={logo} style={{ height: "70px" }} />
      <Link to="/" style={styles.linkb}>
        Monthly Reporting
      </Link>
      <Link to="/expenses" style={styles.linkb}>
        Expenses
      </Link>
      <Link to="/incomes" style={styles.linkb}>
        Income
      </Link>
      <div>
        <Link to="/dark_light" style={styles.link}>
          Dark/Light
        </Link>
        <br />
        <Link to="/about" style={styles.link}>
          About ZENS
        </Link>
      </div>
      <div>
        <span style={{ color: "black", fontWeight: "bold" }}>{user_name}</span>
        <br />
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
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
  linkb: {
    textDecoration: "none",
    color: "blue",
    fontWeight: "bold",
    fontSize: "24px",
  },
  logoutButton: {
    background: "none",
    border: "none",
    color: "red",
    //fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    padding: 0,
  },
};

export default Navbar;
