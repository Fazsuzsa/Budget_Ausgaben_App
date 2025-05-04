import React from "react";
import logo from "../assets/images/logo.svg";

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

      <div>
        <a href="/login" style={styles.link}>
          LOGIN
        </a>
      </div>

      <a href="/about" style={styles.link}>
        ZENS
      </a>
      <div>
        <a href="/ENG-GER" style={styles.link}>
          english/german
        </a>
      </div>

      <div>
        <a href="/dark-light" style={styles.link}>
          dark/light
        </a>
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
};

export default Navbar;
