import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Sidebar = (props) => {
  const { window, handleLogoutUser, currentUser } = props;
  console.log("currentUser", JSON.stringify(currentUser));
  const userId = currentUser?.id;

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    handleLogoutUser();
    // localStorage.clear();
    navigate("/");
  };

  const drawer = (
    <div style={{ width: "200px" }}>
      <Toolbar />
      <Divider />
      <List>
        <List>
          <ListItem>
            <Link to={`/profile`}>
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <DashboardIcon sx={{ marginRight: "5px" }} />
                Profile
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/teams">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <DashboardIcon sx={{ marginRight: "5px" }} />
                Manage teams
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/tasks">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <DashboardIcon sx={{ marginRight: "5px" }} />
                Manage tasks
              </Button>
            </Link>
          </ListItem>

          <ListItem>
            <Button
              onClick={logout}
              style={{
                backgroundColor: "#d65046",
                color: "#fff",
                marginTop: "32vh",
              }}
            >
              <LogoutIcon />
              Logout
            </Button>
          </ListItem>
        </List>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "#0c55c9" }}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <p className="title"> Collaborative Task Manager</p>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
