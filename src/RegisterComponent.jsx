// RegisterComponent.js
import React, { useState } from "react";
import { useUser } from "./UserContext";

const RegisterComponent = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    const newUser = { username, email, password };
    setUser(newUser);

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));
  };

  return (
    <div className="login-box">
      <h2>Register</h2>
      <input
        className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default RegisterComponent;
