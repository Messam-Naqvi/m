import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollLayout from "./ScrollLayout";
import AcademicJourney from "./Components/Academic_Journey";

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        {/* Scroll-based portfolio */}
        <Route path="/*" element={<ScrollLayout />} />

        {/* Route-only page */}
        <Route path="/about/academic-journey" element={<AcademicJourney />} />
      </Routes>
    </Router>
  );
}
