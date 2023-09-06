import { Avatar, Paper, Typography } from "@mui/material";
import Homepage from "../Homepage/Homepage";

const UserProfile = ({ user }) => {
  const { username, bio, profilePicture } = user || {};
  return (
    <>
      <Homepage />
      <Paper className="profile">
        <Avatar alt={username} src={profilePicture} className="" />
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
