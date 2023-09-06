import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserLogin = ({ loginUser }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials);
    setCredentials({
      username: "",
      password: "",
    });
    //   redirect to homepage
    navigate("/homepage");
  };

  return (
    <div>
      <h4>Sign in to your account</h4>
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
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" className="form-btn">
          Login
        </button>
        <Link to="/register" className="link-text">
          Create new account
        </Link>
      </form>
    </div>
  );
};

export default UserLogin;
