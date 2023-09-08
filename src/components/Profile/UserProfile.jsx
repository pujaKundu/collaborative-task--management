import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const UserProfile = ({ user }) => {
  const { username, bio, profilePicture } = user || {};
  return (
    <>
      <Sidebar />

      <Card
        sx={{
          display: "flex",
          marginLeft: "25%",
          marginRight: "10%",
          marginTop: "-10%",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 151, margin: "10px" }}
          image={profilePicture}
          alt={username}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "3%",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {username}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {bio}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default UserProfile;
