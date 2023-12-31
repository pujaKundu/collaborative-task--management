import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";

const UserRegistration = ({ registerUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    profilePicture: "",
    bio: "",
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user);
    setUser({
      username: "",
      password: "",
      profilePicture: "",
      bio: "",
     
    });
    alert("Account created successfully");
    navigate("/");
  };

  return (
    <Box className='bg-color'>
      <h3>Collaborative Task Manager</h3>
      <h4>Create new user</h4>
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <div className="signup-div">
            <label>
              <p className="label-text">Username:</p>
              <TextField
                required
                id="outlined-required"
                label="Username"
                type="text"
                name="username"
                className="form-input"
                value={user.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <p className="label-text">Password:</p>
              <TextField
                id="outlined-read-only-input"
                label="Password"
                type="password"
                name="password"
                className="form-input"
                value={user.password}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              <p className="label-text">Profile picture URL:</p>
              <TextField
                required
                id="outlined-required"
                label="Profile picture URL"
                type="text"
                name="profilePicture"
                className="form-input"
                value={user.profilePicture}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <p className="label-text">Bio:</p>
              <TextField
                name="bio"
                label="Bio"
                className="form-input"
                value={user.bio}
                onChange={handleInputChange}
              />
            </label>
          </div>
         
        </div>
        <button type="submit" className="form-btn">
          Sign up
        </button>
      </form>{" "}
    </Box>
  );
};

export default UserRegistration;
