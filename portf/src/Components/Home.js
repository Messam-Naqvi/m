import React, { useState, useEffect } from "react";
import { Typography, Button, IconButton, Modal, Box, Stack, Fade, Chip, Grid } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import TerminalIcon from "@mui/icons-material/Terminal";
import HubIcon from "@mui/icons-material/Hub";
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
  width: "90%",
  maxWidth: 700,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "rgba(8, 8, 8, 0.98)",
  backdropFilter: "blur(30px)",
  borderRadius: { xs: 4, md: 6 },
  border: "1px solid rgba(128, 0, 128, 0.2)",
  boxShadow: "0 0 80px rgba(0, 0, 0, 0.9)",
  p: { xs: 3, md: 6 },
  outline: "none",
};

const serviceCardStyle = {
  p: 3,
  height: "100%",
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    background: "rgba(128, 0, 128, 0.08)",
    borderColor: "purple",
    transform: "translateY(-5px)",
  }
};

const Home = () => {
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
        overflowX: "hidden",
        backgroundColor: "#020202",
        background: `
          radial-gradient(circle at 10% 20%, rgba(128, 0, 128, 0.12) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(75, 0, 130, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 1) 0%, rgba(5, 5, 5, 1) 100%)
        `,
      }}
    >
      {/* Animated Background Element */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, purple 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box 
        sx={{ 
          px: { xs: 3, sm: 6, md: 12 }, 
          py: { xs: 10, md: 0 },
          zIndex: 1, 
          position: "relative", 
          width: "100%" 
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} lg={9}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Chip 
                label="OPEN FOR COLLABORATION" 
                size="small" 
                sx={{ 
                  mb: 3,
                  bgcolor: "rgba(128, 0, 128, 0.1)", 
                  color: "purple", 
                  fontWeight: 800, 
                  fontSize: "0.65rem",
                  border: "1px solid rgba(128, 0, 128, 0.3)",
                  letterSpacing: 1
                }} 
              />

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 950,
                  fontSize: { 
                    xs: "clamp(2.5rem, 10vw, 3.5rem)", 
                    md: "clamp(4rem, 8vw, 6rem)" 
                  },
                  lineHeight: { xs: 1.1, md: 0.9 },
                  mb: 2,
                  letterSpacing: { xs: -1, md: -4 },
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
                    fontWeight: 700,
                    color: "#d1c4e9",
                    fontSize: { 
                      xs: "clamp(1.2rem, 5vw, 1.8rem)", 
                      md: "clamp(2rem, 4vw, 3.5rem)" 
                    },
                    display: "block",
                    mt: { xs: 1, md: 2 },
                    lineHeight: 1.2,
                  }}
                >
                  {CONFIG.tagline}
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: "650px",
                  color: "#888",
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                  lineHeight: 1.6,
                  mb: 4,
                  borderLeft: "2px solid purple",
                  pl: { xs: 2, md: 3 },
                }}
              >
                {CONFIG.bio}
              </Typography>

              {/* Stats - Horizontal on desktop, wrapping on mobile */}
              <Stack 
                direction="row" 
                spacing={{ xs: 3, md: 6 }} 
                sx={{ mb: { xs: 5, md: 6 }, flexWrap: "wrap", gap: { xs: 2, md: 0 } }}
              >
                {CONFIG.stats.map((stat, i) => (
                  <Box key={i}>
                    <Typography sx={{ color: "white", fontWeight: 900, fontSize: { xs: "1.1rem", md: "1.3rem" } }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{ color: "#555", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* Action Buttons - Stacked on mobile */}
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={2}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  variant="contained"
                  href={mailToLink}
                  startIcon={<MailIcon />}
                  fullWidth={false}
                  sx={{
                    bgcolor: "purple",
                    px: { xs: 3, md: 5 },
                    py: 1.8,
                    borderRadius: "14px",
                    fontWeight: 800,
                    textTransform: "none",
                    boxShadow: "0 10px 30px rgba(128,0,128,0.2)",
                    "&:hover": { bgcolor: "#5e35b1", transform: "translateY(-2px)" },
                  }}
                >
                  Get in Touch
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleOpen}
                  startIcon={<SearchIcon />}
                  sx={{
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "white",
                    px: { xs: 3, md: 5 },
                    py: 1.8,
                    borderRadius: "14px",
                    fontWeight: 800,
                    textTransform: "none",
                    backdropFilter: "blur(10px)",
                    "&:hover": { borderColor: "purple", bgcolor: "rgba(128,0,128,0.05)", transform: "translateY(-2px)" },
                  }}
                >
                  Explore Services
                </Button>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Services Modal */}
      <Modal open={openModal} onClose={handleClose} closeAfterTransition>
        <Fade in={openModal}>
          <Box sx={modalStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h4" sx={{ color: "white", fontWeight: 900, letterSpacing: -1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                  My <span style={{ color: "purple" }}>Expertise</span>
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
                  Scalable engineering for the modern web.
                </Typography>
              </Box>
              <IconButton onClick={handleClose} sx={{ color: "#444", "&:hover": { color: "white" } }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              {CONFIG.services.map((service, idx) => (
                <Grid item xs={12} sm={6} md={6} key={idx}>
                  <Box sx={serviceCardStyle}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                      <Box sx={{ p: 0.8, borderRadius: "8px", bgcolor: "rgba(128,0,128,0.15)", color: "purple", display: "flex" }}>
                        {service.icon}
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "white" }}>
                        {service.title}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: "#888", lineHeight: 1.5, fontSize: '0.85rem' }}>
                      {service.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box 
              sx={{ 
                mt: 4, 
                p: 2, 
                bgcolor: "rgba(128,0,128,0.03)", 
                borderRadius: "16px", 
                border: "1px dashed rgba(128,0,128,0.2)", 
                textAlign: 'center' 
              }}
            >
              <Typography sx={{ color: "#666", fontSize: "0.75rem", fontWeight: 500 }}>
                Have a specific requirement?{" "}
                <Box 
                  component="span" 
                  onClick={() => window.location.href = mailToLink}
                  sx={{ color: 'purple', fontWeight: 700, cursor: 'pointer', "&:hover": { textDecoration: 'underline' } }}
                >
                  Let's talk.
                </Box>
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Home;