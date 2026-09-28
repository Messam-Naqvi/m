import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./Navbar.css";
import logo from "../logo.png";

const SCROLL_LINKS = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Skills", to: "skill" },
  { label: "Projects", to: "projects" },
  { label: "Research", to: "fyp" },
  { label: "Contact", to: "contact" },
];

const navButtonSx = {
  marginLeft: "20px",
  color: "#fff",
  "&:hover": { backgroundColor: "#800080" },
};

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer((v) => !v);
  const handleCloseDrawer = () => setShowDrawer(false);

  const isResourcesActive = location.pathname.startsWith("/resources");
  const onHomepage = !isResourcesActive;

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backgroundColor: "transparent", backgroundImage: "none", boxShadow: "none" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#FFFFFF", marginLeft: "30px", fontSize: "23px" }}
        >
          <RouterLink to="/" style={{ display: "inline-flex" }}>
            <img
              src={logo}
              alt="Site logo"
              style={{ height: "70px", marginRight: "10px", marginTop: "15px", width: "140px" }}
            />
          </RouterLink>
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label={showDrawer ? "close menu" : "open menu"}
              onClick={showDrawer ? handleCloseDrawer : toggleDrawer}
            >
              {showDrawer ? <CloseIcon sx={{ color: "#FFFFFF" }} /> : <MenuIcon sx={{ color: "#FFFFFF" }} />}
            </IconButton>
            <Drawer
              anchor="right"
              open={showDrawer}
              onClose={toggleDrawer}
              PaperProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 1)", color: "#FFFFFF" } }}
            >
              <List>
                <ListItem button onClick={handleCloseDrawer}>
                  <CloseIcon sx={{ color: "#FFFFFF" }} />
                  <ListItemText />
                </ListItem>
                {onHomepage &&
                  SCROLL_LINKS.map((link) => (
                    <ScrollLink key={link.to} to={link.to} spy smooth duration={500} onClick={handleCloseDrawer}>
                      <ListItem
                        button
                        sx={{ borderRadius: "8px", "&:hover": { backgroundColor: "#800080" } }}
                      >
                        <ListItemText primary={link.label} />
                      </ListItem>
                    </ScrollLink>
                  ))}
                <RouterLink to="/resources" style={{ textDecoration: "none", color: "inherit" }} onClick={handleCloseDrawer}>
                  <ListItem
                    button
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: isResourcesActive ? "#800080" : "transparent",
                      "&:hover": { backgroundColor: "#800080" },
                    }}
                  >
                    <ListItemText primary="Resources" />
                  </ListItem>
                </RouterLink>
              </List>
            </Drawer>
          </>
        ) : (
          <>
            {onHomepage &&
              SCROLL_LINKS.map((link) => (
                <ScrollLink key={link.to} to={link.to} spy smooth duration={500}>
                  <Button sx={navButtonSx}>{link.label}</Button>
                </ScrollLink>
              ))}
            <Button
              component={RouterLink}
              to="/resources"
              sx={{ ...navButtonSx, backgroundColor: isResourcesActive ? "#800080" : "transparent" }}
            >
              Resources
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
