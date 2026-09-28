import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Element, scroller } from "react-scroll";
import { Box, Skeleton } from "@mui/material";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Projects from "./Components/Projects";
import ResearchSection from "./Components/ResearchSection";
import Contact from "./Components/Contact";
import Footer from "./Components/Footor";

// Below-the-fold and only lit up once scrolled near — avoids opening a
// Firestore connection on every homepage load for visitors who never scroll
// this far, which matters most on slow/metered connections.
const ResourcesPreview = lazy(() => import("./Components/Resources/ResourcesPreview"));

const ResourcesPreviewGate = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "600px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Box ref={ref} sx={{ minHeight: visible ? "auto" : "60vh" }}>
      {visible && (
        <Suspense fallback={<Skeleton variant="rounded" height={300} sx={{ mx: { xs: 2, md: 8 }, bgcolor: "rgba(255,255,255,0.06)" }} />}>
          <ResourcesPreview />
        </Suspense>
      )}
    </Box>
  );
};

const ScrollLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const pathToSection = {
      "/about": "about",
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

      <Element name="resources">
        <ResourcesPreviewGate />
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
