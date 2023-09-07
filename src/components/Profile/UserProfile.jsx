import { Avatar, Paper, Typography } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const UserProfile = ({ user }) => {
  console.log("user", user);
  const { username, bio, profilePicture } = user || {};
  return (
    <>
      <Sidebar />
      <Paper className="profile">
        <Avatar alt={username} src={profilePicture} className="profile-img" />
        <Typography variant="h5" gutterBottom>
          {username}
        </Typography>
        <Typography variant="body1" paragraph>
          {bio || "No bio available"}
        </Typography>
      </Paper>
    </>
  );
};

export default UserProfile;
