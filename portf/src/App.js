import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Element, scroller } from "react-scroll";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Skill from "./Components/Skill";
import Projects from "./Components/Projects";
import ResearchSection from "./Components/ResearchSection"; // FYP / Research
import Contact from "./Components/Contact";
import Footer from "./Components/Footor";
import "./App.css";

/* ================== ScrollToSection ================== */
const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const pathToSection = {
      "/about": "about",
      "/skills": "skill",
      "/projects": "projects",
      "/researches": "fyp",
      "/contact": "contact",
    };

    const section = pathToSection[location.pathname];
    if (section) {
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -70,
      });
    }
  }, [location.pathname]);

  return null;
};

/* ================== Main App ================== */
function App() {
  return (
    <>
      <Navbar />
      <ScrollToSection />

      <Element name="home">
        <Home />
      </Element>

      <Element name="about">
        <About />
      </Element>

      <Element name="skill">
        <Skill />
      </Element>

      <Element name="projects">
        <Projects />
      </Element>

      <Element name="fyp">
        <ResearchSection />
      </Element>

      <Element name="contact">
        <Contact />
      </Element>

      <Element name="footer">
        <Footer />
      </Element>
    </>
  );
}

/* ================== Export with Router ================== */
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
