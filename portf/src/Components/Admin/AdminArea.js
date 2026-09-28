import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

// Everything admin-related — including the Firebase Auth SDK itself — lives
// behind this one lazy-loaded entry point (see AppWrapper.js) so visitors who
// never touch /admin never download any of it.
export default function AdminArea() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path=""
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
