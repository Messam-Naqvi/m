import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [loading, setLoading] = useState(false);
  const aboutRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
     
    };
  }, []);

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => setSnackbar({ ...snackbar, open: false }), 4000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name) return "Name is required";
    if (name.length < 3 || name.length > 40) return "Name is invalid";
    if (!nameRegex.test(name)) return "Name must contain only letters";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Email is not valid";
    return "";
  };

  const validateMessage = (message) => {
    if (!message) return "Message is required";
    if (message.length < 3) return "Message is invalid";
    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount > 50) return "Message must not exceed 50 words";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);
    if (nameError || emailError || messageError) {
      setErrors({ name: nameError, email: emailError, message: messageError });
    } else {
      setErrors({});
      setLoading(true); // Start loading
      try {
        const response = await axios.post(
          "https://agytrh.onrender.com/api/contactus",
          { name, email, message }
        );
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setName(""); // Clear form fields
        setEmail("");
        setMessage("");
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to send message.Try Again!",
          severity: "error",
        });
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  return (
    <div
      ref={aboutRef}
      className={`about-container ${isVisible ? "show" : ""}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#3335",
        padding: "20px",
      }}
    >
      {/* Left side with big picture */}
      <div style={{ flex: 1, display: isMobile ? "none" : "block" }}>
        <img
          src={require("./bg2.png")}
          alt="Big Picture"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            marginLeft: "10%",
            marginRight: "10%",
            borderRadius: "10px",
          }}
          className={isVisible ? "show" : ""}
        />
      </div>

      {/* Right side with contact form */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          maxWidth: "400px",
          margin: isMobile ? "0 auto" : "0 10%",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontWeight: "bold",
            fontSize: "2.7rem",
            color: "white",
          }}
        >
          Contact <span style={{ color: "purple" }}>Me</span>
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {/* Name Input */}
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { backgroundColor: "black", color: "white" },
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "purple",
                },
              },
            }}
          />

          {/* Email Input */}
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { backgroundColor: "black", color: "white" },
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "purple",
                },
              },
            }}
          />

          {/* Message Input */}
          <TextField
            id="message"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={!!errors.message}
            helperText={errors.message}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { backgroundColor: "black", color: "white" },
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "purple",
                },
              },
            }}
          />

          {/* Send Message Button */}
          <Button
            type="submit"
            variant="contained"
            endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
            style={{
              backgroundColor: "purple",
              color: "white",
              marginTop: "10px",
            }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>

      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;
