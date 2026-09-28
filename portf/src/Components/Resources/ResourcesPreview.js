import React, { useState } from "react";
import { Box, Typography, Grid, Button, Skeleton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import ResourceCard from "./ResourceCard";
import ResourceDetailModal from "./ResourceDetailModal";
import { useResources } from "../../hooks/useResources";

// Homepage teaser — keeps the depth of the Resources hub off the main scroll
// page while still surfacing that it exists.
const ResourcesPreview = () => {
  const navigate = useNavigate();
  const { resources, loading } = useResources(null);
  const [selected, setSelected] = useState(null);
  const latest = resources.slice(0, 3);

  return (
    <Box sx={{ minHeight: "60vh", py: 10, px: { xs: 2, md: 8 }, color: "#fff" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" fontWeight={800}>
          Knowledge <span style={{ color: "purple" }}>Hub</span>
        </Typography>
        <Typography color="rgba(255,255,255,0.65)" maxWidth={620} mx="auto" mt={1}>
          Notes, resources, and material from my MS in AI at LUMS, published as I go.
        </Typography>
      </Box>

      {loading && (
        <Grid container spacing={3} justifyContent="center">
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Skeleton variant="rounded" height={180} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && latest.length === 0 && (
        <Typography textAlign="center" sx={{ opacity: 0.5 }}>
          First resources are on the way — check back soon.
        </Typography>
      )}

      {!loading && latest.length > 0 && (
        <Grid container spacing={3} justifyContent="center">
          {latest.map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <ResourceCard resource={resource} onOpen={setSelected} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box textAlign="center" mt={6}>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/resources")}
          sx={{ borderColor: "#8a2be2", color: "#fff", px: 4, "&:hover": { background: "rgba(138,43,226,0.15)" } }}
        >
          Explore All Resources
        </Button>
      </Box>

      <ResourceDetailModal resource={selected} onClose={() => setSelected(null)} />
    </Box>
  );
};

export default ResourcesPreview;
