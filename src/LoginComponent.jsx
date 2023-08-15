// LoginComponent.js
import React, { useState } from "react";
import { useUser } from "./UserContext";
import "./loginComponent.css";
const LoginComponent = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    console.log("Existing Users:", existingUsers);

    const storedUser = existingUsers.find((user) => user.username === username);

    console.log("Stored User:", storedUser);

    if (storedUser && storedUser.password === password) {
      setUser(storedUser);

      localStorage.setItem("authenticated", "true");
      localStorage.setItem("authenticatedUser", JSON.stringify(storedUser));
      setLoginError("");
      window.location.reload(false);
    } else {
      setLoginError("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div className="login-box">
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
        <button onClick={handleLogin}>Login</button>
        <p style={{ color: "red" }}>{loginError}</p>{" "}
      </div>
    </div>
  );
};

export default LoginComponent;
