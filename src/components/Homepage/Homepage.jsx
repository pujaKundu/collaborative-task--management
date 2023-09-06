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
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

// New Configuration Component
const ConfigurationComponent = () => {
  return (
    <Box>
      {/* Place your configuration content here */}
      <Typography variant="h4">Configuration Component</Typography>
    </Box>
  );
};

const Homepage = (props) => {
  const { window, handleLogoutUser } = props;
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
          {/* <ListItem>
            <Link to="/homepage">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <DashboardIcon sx={{ marginRight: "5px" }} />
                Dashboard
              </Button>
            </Link>
          </ListItem> */}

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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Homepage;
