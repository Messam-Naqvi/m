import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { motion } from "framer-motion";

// Styled Components
const Header = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: "bold",
  color: "white",
  textAlign: "center",
  margin: theme.spacing(4, 0),
}));

const ContentBox = styled(Paper)(({ theme }) => ({
  color: "#ffffff",
  padding: theme.spacing(3),
  borderRadius: "8px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
  background: "linear-gradient(45deg, rgba(124,77,255,0.3), rgba(28,28,28,1))",
  marginBottom: theme.spacing(2), // Margin between grid items
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: "8px",
  backgroundColor: "#333",
  "& .MuiLinearProgress-bar": {
    borderRadius: "8px",
    backgroundColor: "purple",
  },
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: "purple",
  color: "#ffffff",
  fontSize: "15px",
}));

const TechChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: "purple",
  color: "white",
  fontSize: "15px",
}));

const AccordionDetailsBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#222",
  borderRadius: "4px",
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

const Fyp = () => {
  const gridRef = useRef();
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const targetValue = 50;

 useEffect(() => {
  const element = gridRef.current; // ✅ capture ref ONCE

  if (!element) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(element);

  return () => {
    observer.unobserve(element); // ✅ safe cleanup
  };
}, []);


  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2;
      const stepTime = 100;
      const totalSteps = (duration * 1000) / stepTime;
      const increment = targetValue / totalSteps;

      const progressInterval = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          start = targetValue;
          clearInterval(progressInterval);
        }
        setProgress(Math.floor(start));
      }, stepTime);

      return () => clearInterval(progressInterval);
    }
  }, [inView, targetValue]);

  const EMAIL_ADDRESS = process.env.REACT_APP_EMAIL_ADDRESS || "mim3@gmail.com";
  const mailtoLink = `mailto:${EMAIL_ADDRESS}?subject=Feedback&body=...`;

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        padding: "50px 0", // Use vertical padding to create space on the top and bottom
        minHeight: "100vh",
        color: "white",
        width: "100%",
      }}
    >
      <Header>Final Year Project</Header>
      <Box ref={gridRef} sx={{ width: "100%", padding: "0 20px" }}> {/* Padding on the sides */}
        <Grid container spacing={2} justifyContent="center"> {/* Add spacing between items */}
          {/* Project Title and Progress */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <ContentBox>
                <Typography variant="h5" sx={{ color: "#f56733", fontWeight: "bold" }}>
                  Red Lesions Detection from Diabetic Retinopathy
                </Typography>
                <Typography variant="body1" paragraph sx={{ marginTop: 2, lineHeight: 1.6 }}>
                  This project focuses on creating an innovative web application for red lesion detection in diabetic retinopathy, using deep learning for enhanced diagnostic accuracy...
                </Typography>
                <Box sx={{ marginTop: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    Project Progress
                  </Typography>
                  <ProgressBar variant="determinate" value={progress} />
                </Box>
              </ContentBox>
            </motion.div>
          </Grid>

          {/* What's this about? */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ContentBox>
                <Typography variant="h5" sx={{ color: "#f56733", fontWeight: "bold" }}>
                  What You Need to Know
                </Typography>
                <Typography variant="body1" paragraph sx={{ marginTop: 2, lineHeight: 1.6 }}>
                This project is about developing a web tool that helps doctors
                  detect early signs of diabetic eye disease by examining images
                  of the retina for red lesions. The tool uses artificial
                  intelligence to quickly and accurately analyze the images,
                  providing results that doctors can use to diagnose and treat
                  patients faster. This can help prevent vision loss for people
                  with diabetes.
                </Typography>
              </ContentBox>
            </motion.div>
          </Grid>

          {/* Key Features */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ContentBox>
                <Typography variant="h5" sx={{ color: "#f56733", fontWeight: "bold" }}>
                  Key Features
                  <br></br>
                  <br></br>
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
                  <FeatureChip label="AI-powered detection" />
                  <FeatureChip label="Fast analysis" />
                  <FeatureChip label="User-friendly interface" />
                  <FeatureChip label="Early Prevention" />
                  
                </Box>
                <br></br>
            <br></br>
            <br></br>
          
              </ContentBox>
            </motion.div>
           
          </Grid>

          {/* Technologies Used */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ContentBox>
                <Typography variant="h5" sx={{ color: "#f56733", fontWeight: "bold" }}>
                  Technologies Used
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
                  <TechChip label="React" />
                  <TechChip label="Node.js" />
                  <TechChip label="Python" />
                  <TechChip label="TensorFlow" />
                  <TechChip label="Kaggle" />
                  <TechChip label="Material UI" />
                </Box>
              </ContentBox>
            </motion.div>
          </Grid>

          {/* Frequently Asked Questions */}
          <Grid item xs={12}>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ContentBox>
                <Typography variant="h5" sx={{ color: "#f56733", fontWeight: "bold" }}>
                  Frequently Asked Questions
                </Typography>

                {[
                   {
                    question: "What does this project do?",
                    answer:
                      "This project is a web app that helps doctors(ophthalmologists) find early signs of a serious eye condition called diabetic retinopathy by analyzing images of the eye. The app looks for red spots in eye pictures, which can indicate a problem.",
                  },
                  {
                    question: "How does the app help doctors?",
                    answer:
                      "It automatically checks eye images for specific red spots or lesions, saving doctors time and helping them detect issues early before they become severe",
                  },
                  {
                    question: "Who can use this app?",
                    answer:
                      "The app is designed for eye doctors(ophthalmologists) and healthcare professionals who treat patients with diabetes. But anyone can use it to understand their eye health better.",
                  },
                  {
                    question: "How accurate is the detection?",
                    answer:
                      "The app uses advanced deep learning models to detect eye problems with high accuracy, ensuring reliable results that help doctors make informed decisions",
                  },
                  {
                    question: "What is diabetic retinopathy?",
                    answer:
                      "It is an eye condition that can happen in people with diabetes, leading to vision problems or blindness if not caught early. This app helps spot it quickly.",
                  },
                ].map((item, index) => (
                  <Accordion
                    key={index}
                    sx={{
                      backgroundColor: "#2c2c2c",
                      color: "#ffffff",
                      borderRadius: "4px",
                      marginTop: 1,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                    >
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <AccordionDetailsBox>
                        <Typography>{item.answer}</Typography>
                      </AccordionDetailsBox>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </ContentBox>
            </motion.div>
          </Grid>

          {/* Feedback Button */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "purple",
                color: "white",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                boxShadow: 4,
                transition: "0.3s",
                '&:hover': {
                  bgcolor: "darkviolet",
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
              href={mailtoLink}
            >
              <FeedbackIcon sx={{ marginRight: 1, color: "white" }} />
              Provide Feedback
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Fyp;