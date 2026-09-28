import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { recordVisit } from "./firebase/analytics";
import ScrollLayout from "./ScrollLayout";
import AcademicJourney from "./Components/Academic_Journey";
import ResourcesHub from "./Components/Resources/ResourcesHub";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ProtectedRoute from "./Components/Admin/ProtectedRoute";

export default function AppWrapper() {
  useEffect(() => {
    recordVisit();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Scroll-based portfolio */}
            <Route path="/*" element={<ScrollLayout />} />

            {/* Route-only pages */}
            <Route path="/about/academic-journey" element={<AcademicJourney />} />
            <Route path="/resources" element={<ResourcesHub />} />
            <Route path="/resources/:categorySlug" element={<ResourcesHub />} />

            {/* Owner-only admin area — not linked from the public nav */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
