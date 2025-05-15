import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/AppIcon.png";
import "../styles/navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const user_name = user?.e_mail;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        padding: "1.5rem 1.5rem",
        position: "relative",
      }}
    >
      <img src={logo} style={{ height: "70px" }} />

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" style={styles.linkb}>Monthly Reporting</Link>
        <Link to="/expenses" style={styles.linkb}>Expenses</Link>
        <Link to="/incomes" style={styles.linkb}>Income</Link>
        <div>
          <Link to="/dark_light" style={styles.link}>Dark/Light</Link>
          <br />
          <Link to="/about" style={styles.link}>About ZENS</Link>
        </div>
        <div>
          <span style={{ color: "black", fontWeight: "bold" }}>{user_name}</span>
          <br />
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
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
