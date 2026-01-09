import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";

/**
 * Contact Component
 * A responsive, animated contact section featuring a side-illustration 
 * and a direct mail-to action. Optimized for all device sizes.
 */
const Contact = () => {
  const contactRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  
  // Responsive Breakpoints
  const isTablet = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  // Intersection Observer to trigger entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  const handleContact = () => {
    const email = "messamnaqvi22@gmail.com";
    const subject = encodeURIComponent("Portfolio Inquiry / Project Collaboration");
    const body = encodeURIComponent(
      `Hello,\n\nI'm reaching out after seeing your portfolio. I'd love to discuss a potential project or collaboration.\n\nBest regards,\n[Your Name]`
    );
    
    setSnackbar({ open: true, message: "Opening your email client...", severity: "info" });
    
    setTimeout(() => {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 800);
  };

  // Helper to handle local image resolution safely
  const getIllustrationSource = () => {
    try {
      return require("./bg2.png");
    } catch (e) {
      return "https://via.placeholder.com/480x480?text=Contact+Illustration";
    }
  };

  return (
    <Box
      ref={contactRef}
      id="contact"
      sx={{
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#3335",
        padding: {
          xs: "100px 20px",
          sm: "120px 40px",
          md: "40px 8%",
          lg: "40px 10%"
        },
        gap: { xs: 6, md: 8 },
        overflow: "hidden",
      }}
    >
      {/* Content Area (Right side on PC, Top on Mobile) */}
      <motion.div
        initial={{ opacity: 0, y: isTablet ? 30 : 0, x: isTablet ? 0 : 100 }}
        animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ 
          flex: "1", 
          width: "100%",
          display: "flex", 
          flexDirection: "column",
          alignItems: isTablet ? "center" : "flex-start",
          textAlign: isTablet ? "center" : "left",
          order: isTablet ? 1 : 2 // Text on top for mobile
        }}
      >
        <Box sx={{ maxWidth: "550px" }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: "2.4rem", sm: "3rem", md: "3.5rem" }, 
              color: "white",
              mb: 2,
              lineHeight: 1.1
            }}
          >
            Contact <span style={{ color: "purple" }}>Me</span>
          </Typography>

          <Box 
            sx={{ 
              backgroundColor: "rgba(255, 255, 255, 0.04)", 
              padding: { xs: 3, sm: 4, md: 5 }, 
              borderRadius: { xs: 6, md: 8 },
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
              mb: 4,
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}
          >
            <Typography 
              sx={{ 
                color: "#e0e0e0", 
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" }, 
                lineHeight: 1.7, 
                mb: 4 
              }}
            >
              Have a project in mind or just want to say hi? My inbox is always open. 
              Click below to start a conversation directly via email.
            </Typography>

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleContact}
              fullWidth={isMobile}
              sx={{
                backgroundColor: "purple",
                color: "white",
                px: { xs: 4, sm: 6 },
                py: 2,
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: 700,
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
              Send Message
            </Button>
          </Box>

          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: 2, fontWeight: 600 }}>
            AVAILABLE FOR FREELANCE & COLLABORATIONS
          </Typography>
        </Box>
      </motion.div>

      {/* Illustration Area (Left side on PC, Bottom on Mobile) */}
      <motion.div
        initial={{ opacity: 0, y: isTablet ? 30 : 0, x: isTablet ? 0 : -100 }}
        animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style={{ 
          flex: "1", 
          display: "flex", 
          justifyContent: "center",
          width: "100%",
          order: isTablet ? 2 : 1 // Image at bottom for mobile
        }}
      >
        <Box
          component="img"
          src={getIllustrationSource()}
          alt="Contact Illustration"
          sx={{
            width: "100%",
            maxWidth: { xs: "320px", sm: "420px", md: "520px" },
            height: "auto",
            filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5))",
            borderRadius: "24px"
          }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/480x480?text=Contact+Illustration"; }}
        />
      </motion.div>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;