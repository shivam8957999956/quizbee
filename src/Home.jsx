import React, { useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import TopicInput from "./TopicInput";
function Home() {
  const [jsonData, setJsonData] = useState({});
  const [auth, setAuth] = useState("false");
  const handleLogout = () => {
    localStorage.removeItem("authenticatedUser");
    localStorage.setItem("authenticated", "false");
    window.location.reload(false);
  };

  useEffect(() => {
    const storedJson = localStorage.getItem("authenticatedUser"); // Replace with your key
    const soredJson = localStorage.getItem("authenticated"); // Replace with your key
    setAuth(soredJson);
    if (storedJson) {
      const parsedJson = JSON.parse(storedJson);
      setJsonData(parsedJson);
    }
  }, []);
  return (
    <div>
      {auth === "true" ? (
        <>
          <h2>Welcome, {jsonData.username}!</h2>
          <p>Email: {jsonData.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <TopicInput />
        </>
      ) : (
        <>
          <p>Please log in to view this content.</p>
          <LoginComponent />
          <RegisterComponent />
        </>
      )}
    </div>
  );
}

export default Home;
