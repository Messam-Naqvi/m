import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Element, scroller } from "react-scroll";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Skill from "./Components/Skill";
import Projects from "./Components/Projects";
import ResearchSection from "./Components/ResearchSection";
import Contact from "./Components/Contact";
import Footer from "./Components/Footor";

const ScrollLayout = () => {
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
        smooth: "easeInOutQuart",
        offset: -70,
      });
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar />

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

      <Footer />
    </>
  );
};

export default ScrollLayout;
