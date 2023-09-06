import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "./utils/userAuthenticationUtils";

import { Homepage, UserLogin, UserRegistration } from "./components/index";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load user data from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    // Save user data to local storage
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleRegisterUser = (newUser) => {
    registerUser(users, newUser, setUsers);
  };

  const handleLoginUser = (credentials) => {
    loginUser(users, credentials, setCurrentUser);
  };

  const handleLogoutUser = () => {
    logoutUser(setCurrentUser);
  };

  return (
    <div id="root">
      <h3>Collaborative Task Manager</h3>
      <Router>
        {!currentUser ? (
          <Routes>
            <Route
              path="/"
              element={<UserLogin loginUser={handleLoginUser} />}
            />
            <Route
              path="/register"
              element={<UserRegistration registerUser={handleRegisterUser} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/homepage"
              element={<Homepage handleLogoutUser={handleLogoutUser} />}
            />

          
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
