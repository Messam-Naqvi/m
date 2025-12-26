import React, { useState } from "react";
import { Link } from "react-scroll";
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

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showDrawer, setShowDrawer] = useState(false);
  const [isHomeHovering, setIsHomeHovering] = useState(false);
  const [isAboutHovering, setIsAboutHovering] = useState(false);
  const [isSkillsHovering, setIsSkillsHovering] = useState(false);
  const [isProjectsHovering, setIsProjectsHovering] = useState(false);
  const [isContactHovering, setIsContactHovering] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#FFFFFF",
            marginLeft: "30px",
            fontSize: "23px",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "70px",
              marginRight: "10px",
              marginTop: "15px",
              width: "140px",
            }}
          />
        </Typography>
        {isMobile ? (
          <>
            {/* Mobile View */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label={showDrawer ? "close menu" : "menu"}
              onClick={showDrawer ? handleCloseDrawer : toggleDrawer}
              sx={{
                bgcolor: showDrawer
                  ? "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)"
                  : "transparent",
              }}
            >
              {showDrawer ? (
                <CloseIcon sx={{ color: "#FFFFFF" }} />
              ) : (
                <MenuIcon sx={{ color: "#FFFFFF" }} />
              )}
            </IconButton>
            <Drawer
              anchor="right"
              open={showDrawer}
              onClose={toggleDrawer}
              classes={{ paper: "drawer-paper" }}
              PaperProps={{
                sx: {
                  backgroundColor: "rgba(0, 0, 0, 1)",
                  color: "#FFFFFF",
                },
              }}
            >
              <List>
                <ListItem button onClick={handleCloseDrawer}>
                  <CloseIcon sx={{ color: "#FFFFFF" }} />
                  <ListItemText />
                </ListItem>
                <Link to="home" spy={true} smooth={true} duration={500}>
                  <ListItem
                    button
                    color="inherit"
                    sx={{
                      marginLeft: "0px",
                      backgroundColor: isHomeHovering
                        ? "#800080"
                        : "transparent",
                      "&:hover": { backgroundColor: "#800080" },
                      borderRadius: "8px",
                    }}
                    onMouseEnter={() => setIsHomeHovering(true)}
                    onMouseLeave={() => setIsHomeHovering(false)}
                  >
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>
                <Link to="about" spy={true} smooth={true} duration={500}>
                  <ListItem
                    button
                    color="inherit"
                    sx={{
                      marginLeft: "0px",
                      backgroundColor: isAboutHovering
                        ? "#800080"
                        : "transparent",
                      "&:hover": { backgroundColor: "#800080" },
                      borderRadius: "8px",
                    }}
                    onMouseEnter={() => setIsAboutHovering(true)}
                    onMouseLeave={() => setIsAboutHovering(false)}
                  >
                    <ListItemText primary="About" />
                  </ListItem>
                </Link>
                <Link to="skill" spy={true} smooth={true} duration={500}>
                  <ListItem
                    button
                    color="inherit"
                    sx={{
                      marginLeft: "0px",
                      backgroundColor: isSkillsHovering
                        ? "#800080"
                        : "transparent",
                      "&:hover": { backgroundColor: "#800080" },
                      borderRadius: "8px",
                    }}
                    onMouseEnter={() => setIsSkillsHovering(true)}
                    onMouseLeave={() => setIsSkillsHovering(false)}
                  >
                    <ListItemText primary="Skills" />
                  </ListItem>
                </Link>
                <Link to="projects" spy={true} smooth={true} duration={500}>
                  <ListItem
                    button
                    color="inherit"
                    sx={{
                      marginLeft: "0px",
                      backgroundColor: isProjectsHovering
                        ? "#800080"
                        : "transparent",
                      "&:hover": { backgroundColor: "#800080" },
                      borderRadius: "8px",
                    }}
                    onMouseEnter={() => setIsProjectsHovering(true)}
                    onMouseLeave={() => setIsProjectsHovering(false)}
                  >
                    <ListItemText primary="Projects" />
                  </ListItem>
                </Link>
                <Link to="contact" spy={true} smooth={true} duration={500}>
                  <ListItem
                    button
                    color="inherit"
                    sx={{
                      marginLeft: "0px",
                      backgroundColor: isContactHovering
                        ? "#800080"
                        : "transparent",
                      "&:hover": { backgroundColor: "#800080" },
                      borderRadius: "8px",
                    }}
                    onMouseEnter={() => setIsContactHovering(true)}
                    onMouseLeave={() => setIsContactHovering(false)}
                  >
                    <ListItemText primary="Contact" />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
          </>
        ) : (
          // PC View
          <>
            <Link to="home" spy={true} smooth={true} duration={500}>
              <Button
                color="inherit"
                sx={{
                  marginLeft: "20px",
                  backgroundColor: isHomeHovering ? "#800080" : "transparent",
                  "&:hover": { backgroundColor: "#800080" },
                }}
                onMouseEnter={() => setIsHomeHovering(true)}
                onMouseLeave={() => setIsHomeHovering(false)}
              >
                Home
              </Button>
            </Link>
            <Link to="about" spy={true} smooth={true} duration={500}>
              <Button
                color="inherit"
                sx={{
                  marginLeft: "20px",
                  backgroundColor: isAboutHovering ? "#800080" : "transparent",
                  "&:hover": { backgroundColor: "#800080" },
                }}
                onMouseEnter={() => setIsAboutHovering(true)}
                onMouseLeave={() => setIsAboutHovering(false)}
              >
                About
              </Button>
            </Link>
            <Link to="skill" spy={true} smooth={true} duration={500}>
              <Button
                color="inherit"
                sx={{
                  marginLeft: "20px",
                  backgroundColor: isSkillsHovering
                    ? "#800080"
                    : "transparent",
                  "&:hover": { backgroundColor: "#800080" },
                }}
                onMouseEnter={() => setIsSkillsHovering(true)}
                onMouseLeave={() => setIsSkillsHovering(false)}
              >
                Skills
              </Button>
            </Link>
            <Link to="projects" spy={true} smooth={true} duration={500}>
              <Button
                color="inherit"
                sx={{
                  marginLeft: "20px",
                  backgroundColor: isProjectsHovering
                    ? "#800080"
                    : "transparent",
                  "&:hover": { backgroundColor: "#800080" },
                }}
                onMouseEnter={() => setIsProjectsHovering(true)}
                onMouseLeave={() => setIsProjectsHovering(false)}
              >
                Projects
              </Button>
            </Link>
            <Link to="contact" spy={true} smooth={true} duration={500}>
              <Button
                color="inherit"
                sx={{
                  marginLeft: "20px",
                  backgroundColor: isContactHovering
                    ? "#800080"
                    : "transparent",
                  "&:hover": { backgroundColor: "#800080" },
                }}
                onMouseEnter={() => setIsContactHovering(true)}
                onMouseLeave={() => setIsContactHovering(false)}
              >
                Contact
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
