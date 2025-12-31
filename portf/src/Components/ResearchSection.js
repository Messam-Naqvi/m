import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";

/* ===================== PAGE ===================== */

const ResearchWrapper = styled(Box)({
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, rgba(120,70,200,0.18), #0b0b12 50%, #000 95%)",
  color: "#dad9e6",
  padding: "90px 16px",
});

/* ===================== TEXT ===================== */

const Title = styled(Typography)({
  fontSize: "3.2rem",
  fontWeight: 800,
  textAlign: "center",
  letterSpacing: "1.3px",
  color: "#eee9ff",
});

const Subtitle = styled(Typography)({
  textAlign: "center",
  maxWidth: 960,
  margin: "20px auto 70px",
  color: "#b9b6cc",
  lineHeight: 1.9,
});

/* ===================== CARD ===================== */

const ResearchCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  background:
    "linear-gradient(180deg, rgba(42,42,58,0.92), rgba(18,18,26,0.95))",
  borderRadius: 22,
  padding: theme.spacing(3),
  border: "1px solid rgba(170,140,255,0.18)",
  boxShadow: "0 35px 90px rgba(0,0,0,0.85)",
  height: "100%",
}));

const OpenIcon = styled(IconButton)({
  position: "absolute",
  top: 14,
  right: 14,
  color: "#cfc9ff",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(6px)",
  "&:hover": {
    background: "rgba(160,120,255,0.25)",
  },
});

/* ===================== ELEMENTS ===================== */

const SectionLabel = styled(Typography)({
  fontSize: "0.8rem",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "#a897ff",
  marginBottom: 8,
  fontWeight: 600,
});

const Heading = styled(Typography)({
  fontSize: "1.6rem",
  fontWeight: 700,
  color: "#f0edff",
  marginBottom: 12,
});

/* ===================== CHIPS ===================== */

const StatusChip = styled(Chip)({
  background: "rgba(60,200,140,0.18)",
  border: "1px solid rgba(60,200,140,0.45)",
  color: "#bfffe7",
  fontWeight: 600,
  marginRight: 8,
  marginBottom: 8,
});

const DateChip = styled(Chip)({
  background: "rgba(120,140,255,0.18)",
  border: "1px solid rgba(120,140,255,0.45)",
  color: "#d8ddff",
  fontWeight: 600,
  marginRight: 8,
  marginBottom: 8,
});

const DomainChip = styled(Chip)({
  background: "rgba(80,190,190,0.18)",
  border: "1px solid rgba(80,190,190,0.45)",
  color: "#d6f7f7",
  fontWeight: 600,
  marginRight: 8,
  marginBottom: 8,
});

const TechChip = styled(Chip)({
  background: "rgba(170,120,255,0.2)",
  border: "1px solid rgba(170,120,255,0.5)",
  color: "#efe6ff",
  fontWeight: 600,
  marginRight: 8,
  marginBottom: 8,
});

/* ===================== COMPONENT ===================== */

const ResearchSection = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <ResearchWrapper ref={ref}>
      <Title>Research & Academic Projects</Title>

      <Subtitle>
        A structured overview of academic research work including undergraduate
        final year projects, applied AI research, and future postgraduate
        studies. Each project emphasizes methodology, experimentation, and
        real-world relevance rather than surface-level implementation.
      </Subtitle>

      <Box maxWidth={1280} mx="auto">
        <Grid container spacing={4}>
          {/* ================= FYP CARD ================= */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <ResearchCard>
                <OpenIcon>
                  <OpenInNewIcon fontSize="small" />
                </OpenIcon>

                <SectionLabel>BSCS · Final Year Project</SectionLabel>

                <Heading>
                  Red Lesions Detection in Diabetic Retinopathy
                </Heading>

                <Typography sx={{ lineHeight: 1.85, color: "#cfcfe0" }}>
                  An AI-assisted diagnostic research project focused on detecting
                  red lesions from retinal fundus images using deep learning.
                  Designed as a clinical decision-support prototype for early
                  diabetic retinopathy screening.
                </Typography>

                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.08)" }} />

                <Typography sx={{ color: "#b5b3c9", lineHeight: 1.85 }}>
                  The work emphasizes dataset preprocessing, CNN-based feature
                  extraction, lesion localization, and integration into a
                  full-stack research prototype rather than only model accuracy.
                </Typography>

                {/* ======= FEATURES ======= */}
                <Box mt={2}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#bdafff",
                      mb: 1,
                    }}
                  >
                    Research Highlights
                  </Typography>

                  <Typography sx={{ color: "#aeadc6", lineHeight: 1.7 }}>
                    • Retinal fundus image preprocessing  
                    • CNN-based lesion detection  
                    • Emphasis on explainability  
                    • Dataset-driven evaluation  
                    • Research-oriented system design
                  </Typography>
                </Box>

                {/* ======= META ======= */}
                <Box mt={3}>
                  <StatusChip label="Completed" />
                  <DateChip label="June 2025" />
                  <DomainChip label="Medical Imaging" />
                  <TechChip label="Deep Learning" />
                </Box>
              </ResearchCard>
            </motion.div>
          </Grid>

          {/* ================= FUTURE ================= */}
          <Grid item xs={12} md={6}>
            <ResearchCard
              sx={{
                borderStyle: "dashed",
                opacity: 0.85,
              }}
            >
              <SectionLabel>Upcoming</SectionLabel>
              <Heading>MS Research / Publications</Heading>
              <Typography sx={{ color: "#9d9bb5", lineHeight: 1.9 }}>
                This space is reserved for postgraduate research, journal
                submissions, conference papers, and advanced experimental
                systems currently under planning or exploration.
              </Typography>
            </ResearchCard>
          </Grid>
        </Grid>
      </Box>
    </ResearchWrapper>
  );
};

export default ResearchSection;
