import React, { useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import TopicInput from "./TopicInput";
function Home() {
  const [jsonData, setJsonData] = useState({});
  const [value, setvalue] = useState(1);
  const [auth, setAuth] = useState("false");
  const handleLogout = () => {
    localStorage.removeItem("authenticatedUser");
    localStorage.setItem("authenticated", "false");
    window.location.reload(false);
  };
  const handleValue = () => {
    if (value) setvalue(0);
    else setvalue(1);
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
        <div className="header-text">
          <div className="header">
            <h2>Welcome, {jsonData.username}!</h2>
            <p>Email: {jsonData.email}</p>
            <button className="btn1" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <TopicInput />
        </div>
      ) : (
        <>
          <div className="header">
            <p>Please log in to view this content or Register if you are New</p>
            {value ? (
              <button className="btn1" onClick={handleValue}>
                Register
              </button>
            ) : (
              <button className="btn1" onClick={handleValue}>
                Login
              </button>
            )}
          </div>
          {value ? <LoginComponent /> : <RegisterComponent />}
        </>
      )}
    </div>
  );
}

export default Home;
