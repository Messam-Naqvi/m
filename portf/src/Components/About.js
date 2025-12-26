import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import "./About.css";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import me from './Pictures/me.jpg';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false); // State to track whether to show full content or not
  const aboutRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // Function to toggle showing full content
  const handleReadMore = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        ref={aboutRef}
        className={`about-container ${isVisible ? "show" : ""}`}
        style={{ color: "white" }}
      >
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Avatar
              alt="Profile Picture"
              src={me}
              sx={{
                width: 200,
                height: 200,
                margin: "auto",
                border: "4px solid #fff",
              }}
              className={isVisible ? "show" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontSize="60px"
              gutterBottom
              fontWeight="bold"
              textAlign={{ xs: "center", md: "left" }}
              style={{ paddingLeft: "10%", paddingRight: "5%" }}
            >
              About <span style={{ color: "purple" }}>Me</span>
            </Typography>
            {/* Conditionally render full content based on state */}
            {showFullContent ? (
              <>
                <Typography
                  variant="body1"
                  paragraph
                  style={{
                    paddingLeft: "10%",
                    paddingRight: "5%",
                    fontSize: "17px",
                  }}
                >
                  Hello, I am a dedicated software engineer specializing in web
                  development and machine learning. Proficient in the MERN stack, I
                  aim to delve deeper into AI and deep learning.
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  style={{
                    paddingLeft: "10%",
                    paddingRight: "5%",
                    fontSize: "17px",
                  }}
                >
                  My interest in programming sparked during my undergraduate studies
                  in Computer Science, igniting a passion for crafting innovative
                  solutions to real-world challenges.
                </Typography>
              </>
            ) : (
              // Render only a part of the content initially
              <Typography
                variant="body1"
                paragraph
                style={{
                  paddingLeft: "10%",
                  paddingRight: "5%",
                  fontSize: "17px",
                }}
              >
                Hello, I am a dedicated software engineer specializing in web
                development and machine learning. Proficient in the MERN stack, I
                aim to delve deeper into AI and deep learning.
              </Typography>
            )}
            <br></br>
          </Grid>
          <Button
            variant="outlined"
            style={{
              borderColor: "purple",
              color: "white",
              marginLeft: isMobile ? "auto" : "318px", // Adjust margin based on screen size
              marginRight: isMobile ? "auto" : "0", // Add marginRight auto in mobile view
            }}
            sx={{ "&:hover": { backgroundColor: "purple", color: "white" } }}
            onClick={handleReadMore} // Call function to toggle showing full content
          >
            {showFullContent ? "Read Less" : "Read More"}
          </Button>
        </Grid>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default About;
