import { Box, TextField } from "@mui/material";
import { useState } from "react";
import "../../../App.css";

const UserRegistration = ({ registerUser }) => {
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
  };

  return (
    <Box>
      <h4>Create new user</h4>
      <form onSubmit={handleSubmit} className="form">
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
          <p className="label-text">Profile picture url:</p>
          <TextField
            required
            id="outlined-required"
            label="Profile picture url"
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
        <button type="submit" className="form-btn">
          Sign up
        </button>
      </form>
    </Box>
  );
};

export default UserRegistration;
