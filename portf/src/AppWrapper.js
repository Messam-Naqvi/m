import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, CircularProgress } from "@mui/material";
import theme from "./theme";
import { recordVisit } from "./firebase/analytics";
import ScrollLayout from "./ScrollLayout";

// Everything outside the homepage is code-split: visitors browsing the
// portfolio never download the academic-journey timeline, the resources
// hub, or (most importantly) the admin area's Firebase Auth SDK.
const AcademicJourney = lazy(() => import("./Components/Academic_Journey"));
const ResourcesHub = lazy(() => import("./Components/Resources/ResourcesHub"));
const AdminArea = lazy(() => import("./Components/Admin/AdminArea"));

const RouteFallback = () => (
  <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
    <CircularProgress sx={{ color: "purple" }} />
  </Box>
);

export default function AppWrapper() {
  useEffect(() => {
    // Deferred so it never competes with initial render/paint on slow
    // connections — visit tracking isn't time-critical.
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    const handle = idle(() => recordVisit());
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(handle) : clearTimeout(handle));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Scroll-based portfolio */}
            <Route path="/*" element={<ScrollLayout />} />

            {/* Route-only pages */}
            <Route path="/about/academic-journey" element={<AcademicJourney />} />
            <Route path="/resources" element={<ResourcesHub />} />
            <Route path="/resources/:categorySlug" element={<ResourcesHub />} />

            {/* Owner-only admin area — not linked from the public nav */}
            <Route path="/admin/*" element={<AdminArea />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}
