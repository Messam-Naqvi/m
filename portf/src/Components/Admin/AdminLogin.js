import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";

// Deliberately unlinked from the public nav — reachable only if you know the URL.
// No sign-up affordance anywhere: the one account is created directly in the
// Firebase console.
const AdminLogin = () => {
  const navigate = useNavigate();
  const { isOwner } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (isOwner) {
    navigate("/admin", { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #1a1a1a, #000)",
        px: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 380,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 3,
          backdropFilter: "blur(12px)",
        }}
      >
        <Typography variant="h5" fontWeight={800} sx={{ color: "white", mb: 3 }}>
          Admin Sign In
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2, input: { color: "white" }, label: { color: "rgba(255,255,255,0.6)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 3, input: { color: "white" }, label: { color: "rgba(255,255,255,0.6)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={submitting}
          sx={{ backgroundColor: "purple", py: 1.4, "&:hover": { backgroundColor: "darkviolet" } }}
        >
          {submitting ? <CircularProgress size={22} color="inherit" /> : "Sign In"}
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
