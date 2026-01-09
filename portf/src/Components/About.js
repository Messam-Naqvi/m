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
  const isMobile = useMediaQuery("(max-width:900px)");
  //const isSmallMobile = useMediaQuery("(max-width:600px)");

  const [isVisible, setIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Intersection Observer for graceful entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  // Quick Stats Data for UX engagement
  const stats = [
    { label: "Experience", value: "2+ Years", icon: <Terminal fontSize="small" /> },
    { label: "Projects", value: "15+", icon: <Code fontSize="small" /> },
    { label: "Focus", value: "AI & ML", icon: <AutoAwesome fontSize="small" /> },
  ];

  return (
    <>
    <br></br>
   
    <Box
      ref={aboutRef}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        pt: isMobile ? 10 : 0,
        pb: 5,
        px: 3,
        overflow: "hidden"
      }}
    >
      <Grid
        container
        spacing={isMobile ? 4 : 8}
        alignItems="center"
        justifyContent="center"
        maxWidth="1200px"
      >
        {/* Left Side: Visual Identity */}
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={isVisible ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Box sx={{ position: "relative", width: "fit-content", mx: "auto" }}>
              {/* Decorative Background Ring */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-15px",
                  left: "-15px",
                  right: "-15px",
                  bottom: "-15px",
                  border: "2px dashed purple",
                  borderRadius: "50%",
                  animation: "spin 20s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
              {/* Profile Image */}
        <Grid item xs={12} md={5} textAlign="center">
          <Avatar
            src={me}
            alt="Messam Naqvi"
            sx={{
              width: 210,
              height: 210,
              mx: "auto",
              border: "4px solid white",
            }}
            className={isVisible ? "show" : ""}
          />
        </Grid>
            </Box>
            
            {/* Quick Stats Cards */}
            <Box 
              sx={{ 
                display: "flex", 
                gap: 2, 
                mt: 5, 
                justifyContent: "center",
                flexWrap: "wrap" 
              }}
            >
              {stats.map((stat, idx) => (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: 2,
                    minWidth: "100px",
                    textAlign: "center",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(128, 0, 128, 0.3)",
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Box sx={{ color: "purple", mb: 0.5 }}>{stat.icon}</Box>
                  <Typography variant="h6" sx={{ color: "white", fontSize: "1rem", fontWeight: "bold" }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", textTransform: "uppercase" }}>
                    {stat.label}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </motion.div>
        </Grid>

        {/* Right Side: Narrative Content */}
        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color:"white",
              fontSize: "60px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            About <span style={{ color: "purple" }}>Me</span>
          </Typography>
<br></br>
            <Typography
              sx={{
                fontSize: "18px",
                lineHeight: 1.8,
                color: "#f0f0f0",
                textAlign: isMobile ? "center" : "left",
                fontWeight: 300,
                maxWidth: "600px",
                mx: isMobile ? "auto" : 0
              }}
            >
              I am a <span style={{ color: "purple", fontWeight: 500 }}>Computer Science graduate</span> and AI-focused software engineer,
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
                      textAlign: isMobile ? "center" : "left",
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
                      textAlign: isMobile ? "center" : "left",
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
    justifyContent: isMobile ? "center" : "flex-start",
  }}
>
  {["BSCS", "MS AI", "Full Stack", "Deep Learning", "Python"].map((skill) => {
    const isMSAI = skill === "MS AI";

    return (
      <Chip
        key={skill}
        label={skill}
        variant="outlined"
        size="medium"
        sx={{
          color: "white",
          fontSize: "0.85rem",

          /* Conditional color logic */
          borderColor: isMSAI
            ? "rgba(0, 200, 83, 0.6)"   // green border
            : "rgba(128, 0, 128, 0.4)",

          backgroundColor: isMSAI
            ? "rgba(0, 200, 83, 0.12)" // soft green bg
            : "rgba(128, 0, 128, 0.05)",

          "&:hover": {
            borderColor: isMSAI ? "#00c853" : "purple",
            backgroundColor: isMSAI
              ? "rgba(0, 200, 83, 0.22)"
              : "rgba(128, 0, 128, 0.15)",
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
                gap: 3,
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
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
      </Grid>
    </Box>
    </>
  );
};

export default About;