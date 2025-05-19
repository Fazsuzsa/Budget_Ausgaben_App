import React, { useState } from 'react';
import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

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
    <>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Your Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Your Email</Label>
            <Input
              type="email"
              name="e_mail"
              placeholder="Email"
              value={form.e_mail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Your Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Signup
          </Button>                    <p>{message}</p>
        </div>
      </form>
    </>
  );
}

export default Signup;
