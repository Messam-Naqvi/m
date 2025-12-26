import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


const Skill = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: "HTML5", percentage: 80 },
    { name: "CSS", percentage: 75 },
    { name: "JavaScript(ES6)", percentage: 70 },
    { name: "React", percentage: 65 },
    { name: "Node.js", percentage: 60 },
    { name: "Express.js", percentage: 70 },
    { name: "MongoDB", percentage: 75 },
    { name: "SQL", percentage:80 },
    { name: "OOP", percentage: 85 },
    { name: "Data Structures", percentage: 80 },
    { name: "Git/Github", percentage: 75 },
    { name: "Python", percentage: 70 },
    { name: "Material UI", percentage: 75 },
  ];

  return (
    <>
      <div style={{ backgroundColor:"#3334", color: "white", padding: "20px" }}>
        <Typography  variant="h3" fontSize="60px" style={{ fontWeight: "bold", color: "white",textAlign: "center" }}  gutterBottom >
          My <span style={{ color: "purple" }}>Skills</span>
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {skills.map((skill, index) => (
            <Grid item xs={6} sm={3} key={index} style={{ textAlign: "center" }}>
              <br />
              <Typography variant="body1" gutterBottom>
                {skill.name}
              </Typography>
              <div style={{ width: "100%", maxWidth: 100, margin: "auto" }}>
                {loaded && (
                  <div className="circular-progress-container">
                    <CircularProgressbar
                      value={loaded ? skill.percentage : 0}
                      text={`${skill.percentage}%`}
                      strokeWidth={8} // Adjust thickness of the progress bar
                      styles={buildStyles({
                        pathColor: "purple",
                        textColor: "white",
                        trailColor: "transparent",
                      })}
                    />
                  </div>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
  <Button
    variant="outlined"
    href="https://www.linkedin.com/in/messam-naqvi-1a0509271/details/skills/"
    target="_blank" // Open link in a new tab
    rel="noopener noreferrer" // Prevent security vulnerabilities
    style={{ borderColor: "purple", color: "white", margin: "13px" }}
    sx={{ '&:hover': { backgroundColor: 'purple', color: 'white' } }}
  >
    View all Skills
  </Button>

  <Button
    variant="outlined"
    href="https://www.linkedin.com/posts/messamnaqvi_mernstack-fullstack-uetlahore-activity-7118596221300031488-PvsH?utm_source=share&utm_medium=member_desktop"
    target="_blank" // Open link in a new tab
    rel="noopener noreferrer" // Prevent security vulnerabilities
    style={{ borderColor: "purple", color: "white", margin: "13px" }}
    sx={{ '&:hover': { backgroundColor: 'purple', color: 'white' } }}
  >
    View Certification
  </Button>
</div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Skill;
