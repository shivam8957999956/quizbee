import logo from "./logo.svg";
import "./App.css";

import { UserProvider } from "./UserContext";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import TopicInput from "./TopicInput";
import Home from "./Home";

function App() {
  return (
    <UserProvider>
      <div>
        <Home />

        
      </div>
    </UserProvider>
  );
}

export default App;
