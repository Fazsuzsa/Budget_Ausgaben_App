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
        <a href="/" style={styles.link}>
          Budget Manager
        </a>
      </div>

      <div>
        <a href="/login" style={styles.link}>
          LOGIN
        </a>
      </div>

      <a href="/about" style={styles.link}>
        About ZENS
      </a>
      <div>
        <a href="/eng_ger" style={styles.link}>
          English/German
        </a>
      </div>

      <div>
        <a href="/dark_light" style={styles.link}>
          Dark/Light
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
