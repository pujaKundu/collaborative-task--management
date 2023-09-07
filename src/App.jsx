import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { loginUser, registerUser } from "./utils/userAuthenticationUtils";

import {
  CreateTeam,
  ManageTasks,
  ManageTeam,
  Sidebar,
  TaskForm,
  UserLogin,
  UserProfile,
  UserRegistration,
} from "./components/index";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
    return storedCurrentUser || null;
  });

  const [users, setUsers] = useState(() => {
    const json = localStorage.getItem("users");
    if (!json) return [];
    return JSON.parse(json);
  });

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      setUsers(storedUsers);
    } catch (error) {
      console.error("LocalStorage error:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleRegisterUser = (newUser) => {
    registerUser(users, newUser, setUsers);
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const handleLoginUser = (credentials) => {
    const loggedInUser = loginUser(users, credentials);

    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    }
  };

  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin loginUser={handleLoginUser} />} />
          <Route
            path="/register"
            element={<UserRegistration registerUser={handleRegisterUser} />}
          />
          <Route path="/homepage" element={<Sidebar />} />
          <Route path="/profile" element={<UserProfile user={currentUser} />} />
          <Route path="/tasks" element={<ManageTasks />} />

          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/teams" element={<ManageTeam />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
