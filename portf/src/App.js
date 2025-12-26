import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Element } from "react-scroll";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Skill from "./Components/Skill";
import "./App.css";
import Footer from "./Components/Footor";
import Fyp from "./Components/Fyp";
function App() {
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
      <Element name="Fyp">
        <Fyp />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
      <Element name="Footer">
        <Footer />
      </Element>
    </>
  );
}

export default App;
