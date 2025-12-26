import React, { useState, useEffect } from "react";
import { Typography, Button, IconButton, Modal, Box } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Avoid hardcoding sensitive data
const EMAIL_ADDRESS = process.env.REACT_APP_EMAIL_ADDRESS; // Use environment variable

// Styling for the modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "black",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  transition: "transform 0.3s ease-in-out",
  outline: "none",
};

// Custom styles for service entries
const serviceStyle = {
  margin: "10px 0",
  padding: "15px",
  borderRadius: "4px",
  background: "rgba(200, 200, 255, 0.3)",
  color: "white",
};

// Close button style
const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  color: "white",
};

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [typedText, setTypedText] = useState("");
  const targetText = "Messam Naqvi"; // Example static text

  // Modal state
  const [openModal, setOpenModal] = useState(false);

  // Effect for typing text animation
  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (typedText.length < targetText.length) {
        setTypedText(targetText.substring(0, typedText.length + 1));
      } else {
        clearInterval(typeInterval);
      }
    }, 150);
    return () => clearInterval(typeInterval);
  }, [typedText, targetText]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // Mailto link with predefined content
  const mailToLink = `mailto:${EMAIL_ADDRESS}?subject=Inquiry%20Regarding%20[Project/Service%20Name]&body=Dear%20[Your%20Name],%0A%0AI%20hope%20this%20message%20finds%20you%20well.%20I%20am%20reaching%20out%20to%20inquire%20about%20[specific%20details%20of%20the%20project%20or%20service],%20and%20would%20love%20to%20learn%20more%20about%20how%20your%20expertise%20could%20assist%20in%20achieving%20[desired%20outcome%20or%20goal].%20Please%20let%20me%20know%20if%20we%20could%20schedule%20a%20brief%20call%20or%20if%20you%20require%20any%20further%20information%20from%20my%20side.%0A%0ALooking%20forward%20to%20your%20response%20and%20hoping%20for%20a%20productive%20collaboration.%0A%0ABest%20regards,%0A[Your%20Full%20Name]%0A[Your%20Contact%20Information]`;

  return (
    <>
      <br />
      <br />
      <br />
      
      <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <Typography
          variant="body1"
          color="purple"
          style={{
            marginLeft: "4px",
            fontWeight: "bold",
            fontSize: "calc(14px + 1vw)",
          }}
        >
          Hello, I am{" "}
        </Typography>
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: "calc(20px + 3vw)",
          }}
        >
          {typedText} <br />
          <span style={{ whiteSpace: "nowrap", color: "#e0e0e0" }}>
            I build things for the web.
          </span>
        </Typography>
        <Typography
          variant="body1"
          style={{
            marginTop: "10px",
            fontSize: "calc(10px + 0.5vw)",
            color: "white",
            marginLeft: "5px",
          }}
        >
          <br />
          Passionate software engineer skilled in MERN stack, eager to dive into 
           <br /> deep learning for innovative AI applications. Ready for
          next-level challenges.
        </Typography>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "purple",
              color: "white",
              padding: isSmallScreen ? "6px 12px" : "8px 16px",
            }}
            sx={{ "&:hover": { backgroundColor: "#5e35b1" } }}
            startIcon={<MailIcon />}
            size={isSmallScreen ? "small" : "medium"}
            href={mailToLink} // Implemented mailto link
          >
            Get in Touch
          </Button>

          <Button
            variant="outlined"
            style={{
              borderColor: "purple",
              color: "white",
              padding: isSmallScreen ? "6px 12px" : "8px 16px",
            }}
            startIcon={<SearchIcon />}
            onClick={handleOpen}
            size={isSmallScreen ? "small" : "medium"}
          >
            Explore Services
          </Button>
        </div>
      </div>
      <br />

      {/* Modal for Services */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton onClick={handleClose} sx={closeButtonStyle}>
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-title"
            variant="h4"
            component="h2"
            sx={{ color: "purple", marginBottom: 2, fontWeight: "bold" }}
          >
            My Services
          </Typography>
          <Typography
            variant="body1"
            id="modal-description"
            sx={{ marginBottom: 2, color: "white" }}
          >
            We offer a variety of services to help you succeed in your projects:
          </Typography>

          <div>
            <div style={serviceStyle}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Web Development
              </Typography>
              <Typography variant="body2">
                Custom Full stack web applications tailored to your business needs.
              </Typography>
            </div>

            <div style={serviceStyle}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Machine Learning Solutions
              </Typography>
              <Typography variant="body2">
                Developing intelligent models for data analysis, predictions
                and automation.
              </Typography>
            </div>

            <div style={serviceStyle}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Desktop App Development
              </Typography>
              <Typography variant="body2">
                Building high-performance desktop applications with sleek,
                modern interfaces.
              </Typography>
            </div>

            <div style={serviceStyle}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Consulting
              </Typography>
              <Typography variant="body2">
                Offering expert advice to help you make informed decisions for
                your projects.
              </Typography>
            </div>
          </div>
        </Box>
      </Modal>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default Home;
