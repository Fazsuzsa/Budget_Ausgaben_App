import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/dark_logo.svg";
import "../styles/responsive.css";
import { ModeToggle } from "./ModeToggle";

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
        position: "relative", // NEU
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        padding: "1.5rem 2rem",
        gap: "2rem",
      }}
          >
          {/* Logo */}
      <div style={{ flexShrink: 0 }}>
        <img src={logo} style={{ height: "70px" }} />
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      {/* Links */}
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" style={styles.linkb}>Monthly Reporting</Link>
        <Link to="/expenses" style={styles.linkb}>Expenses</Link>
        <Link to="/incomes" style={styles.linkb}>Income</Link>
        <Link to="/about" style={styles.linkb}>About ZENS</Link>
      </div>

      {/* User & Dark-Light-Mode */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span className="username">{user_name}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </div>
          <ModeToggle />
        </div>
    </div>

  );
}

const styles = {
  linkb: {
    textDecoration: "none",
    color: "blue",
    fontWeight: "bold",
    fontSize: "20px",
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
