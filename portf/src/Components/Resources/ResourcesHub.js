import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Skeleton,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import Navbar from "../Navbar";
import Footer from "../Footor";
import ResourceCard from "./ResourceCard";
import ResourceDetailModal from "./ResourceDetailModal";
import { useCategories, useResources } from "../../hooks/useResources";

const ResourcesHub = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { resources, loading, error } = useResources(categorySlug);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [selected, setSelected] = useState(null);

  const allTags = useMemo(() => {
    const set = new Set();
    resources.forEach((r) => (r.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [resources]);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch =
        !search ||
        r.title?.toLowerCase().includes(search.toLowerCase()) ||
        r.description?.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !activeTag || (r.tags || []).includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [resources, search, activeTag]);

  return (
    <Box sx={{ minHeight: "100vh", background: "radial-gradient(circle at top, #1a1a1a, #000)" }}>
      <Navbar />
      <Box sx={{ px: { xs: 2, md: 8 }, py: 8, color: "#fff" }}>
        <Typography variant="h3" fontWeight={800}>
          Resources & <span style={{ color: "purple" }}>Knowledge Hub</span>
        </Typography>
        <Typography color="rgba(255,255,255,0.65)" maxWidth={680} mt={1} mb={6}>
          LUMS notes, course material, past papers, and AI/ML resources — published here as I go
          through the MS AI program.
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={3}>
            <Stack spacing={1.5} sx={{ position: { md: "sticky" }, top: 100 }}>
              <Box
                onClick={() => navigate("/resources")}
                sx={{
                  cursor: "pointer",
                  px: 3,
                  py: 1.6,
                  borderRadius: 2,
                  background: !categorySlug ? "linear-gradient(90deg, #4b0082, #8a2be2)" : "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Typography fontWeight={600}>All Resources</Typography>
              </Box>
              {categories.map((cat) => (
                <Box
                  key={cat.id}
                  onClick={() => navigate(`/resources/${cat.slug}`)}
                  sx={{
                    cursor: "pointer",
                    px: 3,
                    py: 1.6,
                    borderRadius: 2,
                    background:
                      categorySlug === cat.slug ? "linear-gradient(90deg, #4b0082, #8a2be2)" : "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Typography fontWeight={600}>{cat.name}</Typography>
                </Box>
              ))}
              {categories.length === 0 && (
                <Typography variant="caption" sx={{ opacity: 0.5, px: 1 }}>
                  Categories will appear here once published.
                </Typography>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md={9}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
              <TextField
                placeholder="Search resources…"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#aaa" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: 320, input: { color: "#fff" }, "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } }}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                {allTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    clickable
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    sx={{
                      bgcolor: activeTag === tag ? "rgba(138,43,226,0.25)" : "rgba(255,255,255,0.06)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Couldn't load resources right now. Please try again shortly.
              </Alert>
            )}

            {loading && (
              <Grid container spacing={3}>
                {[1, 2, 3, 4].map((i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton variant="rounded" height={180} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
                  </Grid>
                ))}
              </Grid>
            )}

            {!loading && !error && filtered.length === 0 && (
              <Box sx={{ textAlign: "center", py: 10, opacity: 0.6 }}>
                <InboxIcon sx={{ fontSize: 48, mb: 2 }} />
                <Typography>No resources here yet — check back soon.</Typography>
              </Box>
            )}

            {!loading && !error && filtered.length > 0 && (
              <Grid container spacing={3}>
                {filtered.map((resource) => (
                  <Grid item xs={12} sm={6} md={4} key={resource.id}>
                    <ResourceCard resource={resource} onOpen={setSelected} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
      <Footer />
      <ResourceDetailModal resource={selected} onClose={() => setSelected(null)} />
    </Box>
  );
};

export default ResourcesHub;
