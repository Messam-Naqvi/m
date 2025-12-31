import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";

/**
 * Contact Component
 * A responsive, animated contact section featuring a side-illustration 
 * and a direct mail-to action.
 */
const Contact = () => {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const isMobile = useMediaQuery("(max-width:900px)");

  // Intersection Observer to trigger entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  const handleContact = () => {
    const email = "messamnaqvi22@gmail.com";
    const subject = encodeURIComponent("Portfolio Inquiry / Project Collaboration");
    const body = encodeURIComponent(
      `Hello,\n\nI'm reaching out after seeing your portfolio. I'd love to discuss a potential project or collaboration.\n\nBest regards,\n[Your Name]`
    );
    
    setSnackbar({ open: true, message: "Opening your email client...", severity: "info" });
    
    // Slight delay to allow user to see the feedback message before redirection
    setTimeout(() => {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 800);
  };

  return (
    <Box
      ref={aboutRef}
      id="contact"
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#3335", // Kept original background color
        padding: isMobile ? "80px 24px" : "40px 10%",
        gap: isMobile ? 4 : 8,
        overflow: "hidden",
      }}
    >
      {/* Left Side: Illustration - Moved further left via flex alignment */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ 
          flex: "1", 
          display: "flex", 
          justifyContent: isMobile ? "center" : "flex-start",
          width: "100%" 
        }}
      >
        <Box
          component="img"
          // Using a placeholder that mimics your bg2.png since local assets cannot be resolved in this environment
          src={require("./bg2.png")}
          alt="Contact Illustration"
          sx={{
            width: "100%",
            maxWidth: "480px",
            height: "auto",
            borderRadius: "20px",
            
          }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/480x480?text=Contact+Illustration"; }}
        />
      </motion.div>

      {/* Right Side: Content Area */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isVisible ? { opacity: 1, x: 30 } : {}} // Slight offset to the right as requested
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style={{ 
          flex: "1", 
          width: "100%",
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", // Centered middle headline
          textAlign: "center"
        }}
      >
        <Box sx={{ maxWidth: "500px" }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              fontSize: isMobile ? "2.2rem" : "3.2rem", 
              color: "white",
              mb: 3,
              lineHeight: 1.2
            }}
          >
            Contact <span style={{ color: "purple" }}>Me</span>
          </Typography>

          <Box 
            sx={{ 
              backgroundColor: "rgba(255, 255, 255, 0.05)", 
              padding: 4, 
              borderRadius: 6,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              mb: 4,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
          >
            <Typography 
              sx={{ 
                color: "#d1d1d1", 
                fontSize: "1.1rem", 
                lineHeight: 1.8, 
                mb: 4 
              }}
            >
              Have a project in mind or just want to say hi? My inbox is always open. 
              Click below to send a message directly to my email.
            </Typography>

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleContact}
              sx={{
                backgroundColor: "purple", // Kept original button color
                color: "white",
                px: 6,
                py: 2,
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)",
                "&:hover": {
                  backgroundColor: "darkviolet",
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 40px rgba(128, 0, 128, 0.5)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Contact Me
            </Button>
          </Box>

          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", letterSpacing: 1 }}>
            AVAILABLE FOR FREELANCE & COLLABORATIONS
          </Typography>
        </Box>
      </motion.div>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;