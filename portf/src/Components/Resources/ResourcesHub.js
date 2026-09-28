import React, { useMemo, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Skeleton,
  Alert,
  Breadcrumbs,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import LinkIcon from "@mui/icons-material/Link";
import NotesIcon from "@mui/icons-material/Notes";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InboxIcon from "@mui/icons-material/Inbox";
import Navbar from "../Navbar";
import Footer from "../Footor";
import ResourceDetailModal from "./ResourceDetailModal";
import { useCategories, useResources } from "../../hooks/useResources";

const TYPE_ICON = {
  link: <LinkIcon fontSize="small" />,
  note: <NotesIcon fontSize="small" />,
};

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "";
  return timestamp.toDate().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const rowSx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: 2.5,
  py: 1.75,
  borderRadius: 2,
  cursor: "pointer",
  border: "1px solid transparent",
  "&:hover": { background: "rgba(138,43,226,0.08)", borderColor: "rgba(138,43,226,0.3)" },
};

const ResourcesHub = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();
  const { resources, loading, error } = useResources(categorySlug);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [selected, setSelected] = useState(null);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

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

  const openResource = (resource) => {
    if (resource.type === "link" && resource.url) {
      window.open(resource.url, "_blank", "noopener,noreferrer");
    } else {
      setSelected(resource);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "radial-gradient(circle at top, #1a1a1a, #000)" }}>
      <Navbar />
      <Box sx={{ px: { xs: 2, md: 8 }, py: 8, color: "#fff" }}>
        <Typography variant="h3" fontWeight={800}>
          Resources & <span style={{ color: "purple" }}>Knowledge Hub</span>
        </Typography>
        <Typography color="rgba(255,255,255,0.65)" maxWidth={680} mt={1} mb={4}>
          LUMS notes, course material, past papers, and AI/ML resources — published here as I go
          through the MS AI program.
        </Typography>

        <Breadcrumbs sx={{ mb: 4, "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.4)" } }}>
          <Link
            component={RouterLink}
            to="/resources"
            underline="hover"
            sx={{ color: categorySlug ? "rgba(255,255,255,0.6)" : "white", fontWeight: categorySlug ? 400 : 700 }}
          >
            Resources
          </Link>
          {activeCategory && (
            <Typography sx={{ color: "white", fontWeight: 700 }}>{activeCategory.name}</Typography>
          )}
        </Breadcrumbs>

        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            background: "rgba(255,255,255,0.02)",
            overflow: "hidden",
          }}
        >
          {/* Toolbar: search + tags, only meaningful once inside a category */}
          {categorySlug && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <TextField
                placeholder="Search this folder…"
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
          )}

          <Box sx={{ p: 1.5 }}>
            {/* ".." row to go back up when inside a category */}
            {categorySlug && (
              <Box sx={rowSx} onClick={() => navigate("/resources")}>
                <ArrowUpwardIcon fontSize="small" sx={{ color: "rgba(255,255,255,0.5)" }} />
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>.. (All Resources)</Typography>
              </Box>
            )}

            {/* Root view: list categories as folders */}
            {!categorySlug && (
              <>
                {categoriesLoading && (
                  <Stack spacing={1}>
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} variant="rounded" height={56} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
                    ))}
                  </Stack>
                )}
                {!categoriesLoading && categories.length === 0 && (
                  <Box sx={{ textAlign: "center", py: 8, opacity: 0.6 }}>
                    <InboxIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography>No folders published yet — check back soon.</Typography>
                  </Box>
                )}
                {categories.map((cat) => (
                  <Box key={cat.id} sx={rowSx} onClick={() => navigate(`/resources/${cat.slug}`)}>
                    <FolderIcon sx={{ color: "#c9a6ff" }} />
                    <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>{cat.name}</Typography>
                    {cat.description && (
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
                        {cat.description}
                      </Typography>
                    )}
                  </Box>
                ))}
              </>
            )}

            {/* Category view: list resources as files */}
            {categorySlug && (
              <>
                {error && (
                  <Alert severity="error" sx={{ m: 1.5 }}>
                    Couldn't load resources right now. Please try again shortly.
                  </Alert>
                )}
                {loading && (
                  <Stack spacing={1}>
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} variant="rounded" height={56} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
                    ))}
                  </Stack>
                )}
                {!loading && !error && filtered.length === 0 && (
                  <Box sx={{ textAlign: "center", py: 8, opacity: 0.6 }}>
                    <InboxIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography>Nothing in this folder yet.</Typography>
                  </Box>
                )}
                {filtered.map((resource) => (
                  <Box key={resource.id} sx={rowSx} onClick={() => openResource(resource)}>
                    <Box sx={{ color: "#c9a6ff", display: "flex" }}>{TYPE_ICON[resource.type] || <NotesIcon fontSize="small" />}</Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 600 }} noWrap>
                        {resource.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }} noWrap>
                        {resource.subcategory ? `${resource.subcategory} · ` : ""}
                        {resource.description}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ maxWidth: 240, justifyContent: "flex-end" }}>
                      {(resource.tags || []).slice(0, 3).map((tag) => (
                        <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "rgba(138,43,226,0.15)", color: "#fff" }} />
                      ))}
                    </Stack>
                    {resource.createdAt && (
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", minWidth: 72, textAlign: "right" }}>
                        {formatDate(resource.createdAt)}
                      </Typography>
                    )}
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
      <ResourceDetailModal resource={selected} onClose={() => setSelected(null)} />
    </Box>
  );
};

export default ResourcesHub;
