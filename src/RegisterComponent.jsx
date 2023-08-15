// RegisterComponent.js
import React, { useState } from "react";
import { useUser } from "./UserContext";

const RegisterComponent = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    // Implement user registration logic here
    // You can save the new user in local storage or an API
    const newUser = { username, email, password };
    setUser(newUser);

    // Get existing users from local storage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    // Add the new user to the existing users array
    existingUsers.push(newUser);

    // Save updated user data in local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterComponent;
