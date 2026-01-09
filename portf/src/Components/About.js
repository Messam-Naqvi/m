import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Avatar,
  Grid,
  Button,
  Box,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  AutoAwesome, 
  Terminal, 
  ArrowForward, 
  ExpandMore, 
  ExpandLess 
} from "@mui/icons-material";
import me from "./Pictures/me.jpg";

const About = () => {
  const aboutRef = useRef(null);
  const navigate = useNavigate();
  
  // Responsive Breakpoints
  const isTablet = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  const [isVisible, setIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Experience", value: "2+ Years", icon: <Terminal fontSize="small" /> },
    { label: "Projects", value: "15+", icon: <Code fontSize="small" /> },
    { label: "Focus", value: "AI & ML", icon: <AutoAwesome fontSize="small" /> },
  ];

  return (
    <Box
      ref={aboutRef}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        pt: isTablet ? 12 : 0,
        pb: 8,
        px: { xs: 2, sm: 4, md: 6 },
        overflow: "hidden"
      }}
    >
      <Grid
        container
        spacing={isTablet ? 6 : 8}
        alignItems="center"
        justifyContent="center"
        maxWidth="1200px"
      >
        {/* About Content: On top for Small/Medium devices (Order 1), Right for Desktop (Order 2) */}
        <Grid item xs={12} md={7} sx={{ order: { xs: 1, md: 2 } }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "white",
                fontSize: { xs: "2.8rem", sm: "3.5rem", md: "60px" },
                textAlign: isTablet ? "center" : "left",
                lineHeight: 1.1,
              }}
            >
              About <span style={{ color: "purple" }}>Me</span>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.8,
                color: "#f0f0f0",
                textAlign: isTablet ? "center" : "left",
                fontWeight: 300,
                maxWidth: { xs: "100%", md: "650px" },
                mx: isTablet ? "auto" : 0
              }}
            >
              I am a <span style={{ color: "purple", fontWeight: 600 }}>Computer Science graduate</span> and AI-focused software engineer,
              dedicated to bridging the gap between complex data and intuitive human experiences.
            </Typography>

            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Typography
                    sx={{
                      mt: 3,
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: "#b0b0b0",
                      textAlign: isTablet ? "center" : "left",
                    }}
                  >
                    My journey spans from foundational software engineering to the frontiers of 
                    <span style={{ color: "white" }}> Artificial Intelligence</span>. I specialize in the MERN stack 
                    while actively training Deep Learning models to solve real-world challenges.
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: "#b0b0b0",
                      textAlign: isTablet ? "center" : "left",
                    }}
                  >
                    I believe in software that isn't just functional, but <strong>meaningful</strong>. 
                    Clean code, scalable architecture, and user-centric design are the pillars of my workflow.
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tags / Skills Chips */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
                mt: 4,
                justifyContent: isTablet ? "center" : "flex-start",
              }}
            >
              {["BSCS", "MS AI", "Full Stack", "Deep Learning", "Python"].map((skill) => {
                const isMSAI = skill === "MS AI";
                return (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      color: "white",
                      fontSize: "0.85rem",
                      borderColor: isMSAI ? "rgba(0, 200, 83, 0.6)" : "rgba(128, 0, 128, 0.4)",
                      backgroundColor: isMSAI ? "rgba(0, 200, 83, 0.1)" : "rgba(128, 0, 128, 0.05)",
                      "&:hover": {
                        borderColor: isMSAI ? "#00c853" : "purple",
                        backgroundColor: isMSAI ? "rgba(0, 200, 83, 0.2)" : "rgba(128, 0, 128, 0.15)",
                      },
                    }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 4, opacity: 0.1, backgroundColor: "white" }} />

            {/* Actions */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 2 : 4,
                justifyContent: isTablet ? "center" : "flex-start",
                alignItems: "center"
              }}
            >
              <Button
                variant="text"
                startIcon={showMore ? <ExpandLess /> : <ExpandMore />}
                onClick={() => setShowMore(!showMore)}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { color: "purple", background: "transparent" },
                }}
              >
                {showMore ? "Collapse Story" : "Read Full Story"}
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate("/about/academic-journey")}
                endIcon={<ArrowForward />}
                fullWidth={isMobile}
                sx={{
                  backgroundColor: "purple",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(128, 0, 128, 0.3)",
                  "&:hover": { 
                    backgroundColor: "darkviolet",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px rgba(128, 0, 128, 0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Academic Journey
              </Button>
            </Box>
          </motion.div>
        </Grid>

        {/* Visual Identity: Second on Mobile (Order 2), Left on Desktop (Order 1) */}
        <Grid item xs={12} md={5} sx={{ order: { xs: 2, md: 1 } }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <Box sx={{ position: "relative", width: "fit-content", mx: "auto" }}>
              {/* Decorative Background Ring */}
              <Box
                sx={{
                  position: "absolute",
                  inset: { xs: -12, md: -15 },
                  border: "2px dashed purple",
                  borderRadius: "50%",
                  animation: "spin 20s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
              <Avatar
                src={me}
                alt="Messam Naqvi"
                sx={{
                  width: { xs: 180, sm: 220, md: 240 },
                  height: { xs: 180, sm: 220, md: 240 },
                  mx: "auto",
                  border: "4px solid white",
                  boxShadow: "0 0 30px rgba(0,0,0,0.4)"
                }}
              />
            </Box>
            
            {/* Quick Stats Grid */}
            <Box 
              sx={{ 
                display: "grid", 
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
                gap: 2, 
                mt: { xs: 5, md: 6 }, 
                width: "100%",
                maxWidth: "450px",
                mx: "auto"
              }}
            >
              {stats.map((stat, idx) => (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(128, 0, 128, 0.3)",
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    // On very small screens, make the 3rd stat span two columns
                    gridColumn: isMobile && idx === 2 ? "span 2" : "span 1"
                  }}
                >
                  <Box sx={{ color: "purple", mb: 0.5, display: "flex", justifyContent: "center" }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" sx={{ color: "white", fontSize: "0.95rem", fontWeight: "bold" }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", textTransform: "uppercase" }}>
                    {stat.label}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;