import React, { useState } from "react";

import { API_URL } from "../lib/utils";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    e_mail: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }

      const data = await response.json();
      setMessage(`Signup successful! Welcome, ${data.name}`);
      // Optional: store token if your backend sends it later
      // localStorage.setItem('token', data.token);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create an Account</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="email"
        name="e_mail"
        placeholder="Email"
        value={form.e_mail}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}

export default Signup;
