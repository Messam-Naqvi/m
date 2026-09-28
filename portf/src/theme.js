import { createTheme } from "@mui/material/styles";

// Centralized brand palette — extracted from the site's existing purple/black
// look so the visual identity doesn't change, only its source of truth.
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#020202",
      paper: "#0b0b12",
    },
    primary: {
      main: "#8a2be2",
      dark: "#4b0082",
      light: "#a855f7",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6a0dad",
    },
    success: {
      main: "#00c853",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
