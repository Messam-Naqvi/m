import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { LinkedIn, GitHub } from '@mui/icons-material';
import { SiKaggle } from 'react-icons/si';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom right, #0d0d0d, #4b0082)', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#ffcc00' }}>
                About Me
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                I am a passionate web developer with expertise in the MERN stack. I love creating web applications that provide great user experiences.
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffcc00' }}>
                Contact Me
              </Typography>
              <Typography variant="body2">
                Email: <a href="mailto:messamnaqvi22@gmail.com" style={{ color: 'white', textDecoration: 'none' }}>messamnaqvi22@gmail.com</a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#ffcc00' }}>
                Quick Links
              </Typography>
              <Box>
                <ScrollLink to="home" spy={true} smooth={true} duration={500} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Home</ScrollLink>
              </Box>
              <Box>
                <ScrollLink to="about" spy={true} smooth={true} duration={500} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>About</ScrollLink>
              </Box>
              <Box>
                <ScrollLink to="projects" spy={true} smooth={true} duration={500} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Projects</ScrollLink>
              </Box>
              <Box>
                <ScrollLink to="Fyp" spy={true} smooth={true} duration={500} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Fyp</ScrollLink>
              </Box>
              <Box>
                <ScrollLink to="contact" spy={true} smooth={true} duration={500} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Contact</ScrollLink>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#ffcc00' }}>
                Let's Connect
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <IconButton
                  href="https://www.linkedin.com/in/messam-naqvi-1a0509271/"
                  target="_blank"
                  color="inherit"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.1)',
                      transition: '0.3s'
                    },
                    transition: '0.3s',
                    width: 56,
                    height: 56
                  }}
                >
                  <LinkedIn fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://github.com/Messam-Naqvi"
                  target="_blank"
                  color="inherit"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.1)',
                      transition: '0.3s'
                    },
                    transition: '0.3s',
                    width: 56,
                    height: 56
                  }}
                >
                  <GitHub fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://www.kaggle.com/messamnaqvi"
                  target="_blank"
                  color="inherit"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.1)',
                      transition: '0.3s'
                    },
                    transition: '0.3s',
                    width: 56,
                    height: 56
                  }}
                >
                  <SiKaggle fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <br></br>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
            &copy; {new Date().getFullYear()} Messam Naqvi. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
