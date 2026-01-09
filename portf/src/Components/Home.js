import React, { useState, useEffect } from "react";
import { Typography, Button, IconButton, Modal, Box, Stack, Fade, Chip, Grid } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import TerminalIcon from "@mui/icons-material/Terminal";
import HubIcon from "@mui/icons-material/Hub";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";

// Configuration Logic
const CONFIG = {
  name: "Messam Naqvi",
  tagline: "I build things for web & AI.",
  bio: "Software Engineer specializing in Neural Architectures and Scalable MERN Systems. Bridging the gap between robust engineering and intelligent automation.",
  email: "messamnaqvi@example.com",
  stats: [
    { label: "Experience", value: "2+ Years" },
    { label: "Projects", value: "5+ Live" },
    { label: "Focus", value: "Deep Learning" }
  ],
  services: [
    { title: "MERN Architecture", desc: "Enterprise-grade full-stack systems with real-time distributed logic.", icon: <HubIcon fontSize="small" /> },
    { title: "Neural Research", desc: "Specialized in Vision Transformers and Large Language Model fine-tuning.", icon: <TerminalIcon fontSize="small" /> },
    { title: "Technical Mentorship", desc: "Consulting for students and startups on scalable tech-stacks.", icon: <CodeIcon fontSize="small" /> }
  ]
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 700,
  bgcolor: "rgba(8, 8, 8, 0.98)",
  backdropFilter: "blur(30px)",
  borderRadius: 6,
  border: "1px solid rgba(128, 0, 128, 0.2)",
  boxShadow: "0 0 80px rgba(0, 0, 0, 0.9)",
  p: { xs: 3, md: 6 },
  outline: "none",
};

const serviceCardStyle = {
  p: 3,
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  cursor: "pointer",
  "&:hover": {
    background: "rgba(128, 0, 128, 0.08)",
    borderColor: "purple",
    transform: "translateY(-5px) scale(1.02)",
    boxShadow: "0 10px 30px rgba(128, 0, 128, 0.2)"
  }
};

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [typedText, setTypedText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= CONFIG.name.length) {
        setTypedText(CONFIG.name.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, []);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const mailToLink = `mailto:${CONFIG.email}?subject=Collaboration%20Inquiry&body=Hi%20Messam,`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#020202",
        // Multi-layered Nebula Background
        background: `
          radial-gradient(circle at 10% 20%, rgba(128, 0, 128, 0.12) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(75, 0, 130, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 1) 0%, rgba(5, 5, 5, 1) 100%)
        `,
      }}
    >
      {/* Dynamic Animated Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(128, 0, 128, 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ px: { xs: 3, md: 12 }, zIndex: 1, position: "relative", width: "100%" }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Recruiter-Ready Badge */}
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <Chip 
                  label="OPEN FOR COLLABORATION" 
                  size="small" 
                  sx={{ 
                    bgcolor: "rgba(128, 0, 128, 0.1)", 
                    color: "purple", 
                    fontWeight: 800, 
                    fontSize: "0.65rem",
                    border: "1px solid rgba(128, 0, 128, 0.3)",
                    letterSpacing: 1
                  }} 
                />
              </Stack>

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 950,
                  fontSize: { xs: "3.2rem", md: "5.5rem" },
                  lineHeight: 0.9,
                  mb: 1.5,
                  letterSpacing: -3,
                  textShadow: "0 0 40px rgba(0,0,0,0.5)"
                }}
              >
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ color: "purple" }}
                >
                  _
                </motion.span>
                <br />
                <Box
  component="span"
  sx={{
   fontWeight: "bold",
              color: "#d1c4e9", whiteSpace: "nowrap",
              fontSize: "calc(22px + 1.5vw)",
              lineHeight: 1.2,
  }}
>
  {CONFIG.tagline}
</Box>

              </Typography>

              <Typography
                sx={{
                  maxWidth: "650px",
                  color: "#777",
                  fontSize: { xs: "0.95rem", md: "1.15rem" },
                  lineHeight: 1.7,
                  mb: 4,
                  fontWeight: 400,
                  borderLeft: "2px solid purple",
                  pl: 3
                }}
              >
                {CONFIG.bio}
              </Typography>

              {/* Quick Meta for Recruiters */}
              <Stack direction="row" spacing={4} sx={{ mb: 6 }}>
                {CONFIG.stats.map((stat, i) => (
                  <Box key={i}>
                    <Typography sx={{ color: "white", fontWeight: 900, fontSize: "1.2rem" }}>{stat.value}</Typography>
                    <Typography sx={{ color: "#444", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: 1 }}>{stat.label}</Typography>
                  </Box>
                ))}
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                <Button
                  variant="contained"
                  href={mailToLink}
                  startIcon={<MailIcon />}
                  sx={{
                    bgcolor: "purple",
                    px: 5,
                    py: 1.8,
                    borderRadius: "16px",
                    fontWeight: 800,
                    textTransform: "none",
                    boxShadow: "0 20px 40px rgba(128,0,128,0.2)",
                    "&:hover": { bgcolor: "#5e35b1", transform: "translateY(-4px)" },
                  }}
                >
                  Hire Me / Get in Touch
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleOpen}
                  startIcon={<SearchIcon />}
                  sx={{
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "white",
                    px: 5,
                    py: 1.8,
                    borderRadius: "16px",
                    fontWeight: 800,
                    textTransform: "none",
                    backdropFilter: "blur(10px)",
                    "&:hover": { borderColor: "purple", bgcolor: "rgba(128,0,128,0.05)", transform: "translateY(-4px)" },
                  }}
                >
                  Technical Services
                </Button>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Services Insight Modal */}
      <Modal open={openModal} onClose={handleClose} closeAfterTransition>
        <Fade in={openModal}>
          <Box sx={modalStyle}>
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 20, right: 20, color: "#555", "&:hover": { color: "white" } }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h3" sx={{ color: "white", fontWeight: 900, mb: 1, letterSpacing: -1 }}>
              Expertise <span style={{ color: "purple" }}>Stack</span>
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", mb: 5, maxWidth: "500px" }}>
              High-performance solutions designed for scalability, security, and intelligence.
            </Typography>

            <Grid container spacing={2.5}>
              {CONFIG.services.map((service, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Box sx={serviceCardStyle}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                      <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "rgba(128,0,128,0.2)", color: "purple", display: "flex" }}>
                        {service.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "white" }}>
                        {service.title}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: "#888", lineHeight: 1.6 }}>
                      {service.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 5, p: 3, bgcolor: "rgba(128,0,128,0.03)", borderRadius: "20px", border: "1px dashed rgba(128,0,128,0.2)", textAlign: 'center' }}>
              <Typography sx={{ color: "#aaa", fontSize: "0.85rem" }}>
                Looking for something custom? <span style={{ color: 'purple', fontWeight: 700, cursor: 'pointer' }} onClick={() => window.location.href = mailToLink}>Let's discuss your project.</span>
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Home;