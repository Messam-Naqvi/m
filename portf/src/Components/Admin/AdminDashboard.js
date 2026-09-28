import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Stack,
  Chip,
  IconButton,
  TextField,
  Switch,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useCategories } from "../../hooks/useResources";
import {
  subscribeToAllResources,
  deleteResource,
  updateResource,
  addCategory,
  deleteCategory,
} from "../../firebase/firestore";
import ResourceForm from "./ResourceForm";
import AnalyticsPanel from "./AnalyticsPanel";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categories } = useCategories();
  const [tab, setTab] = useState(0);

  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [newCategoryName, setNewCategoryName] = useState("");

  React.useEffect(() => {
    const unsub = subscribeToAllResources((data) => {
      setResources(data);
      setResourcesLoading(false);
    });
    return unsub;
  }, []);

  const handleAddCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await addCategory({ name, slug, order: categories.length });
    setNewCategoryName("");
  };

  const handleDeleteResourceConfirmed = async () => {
    if (!confirmDelete) return;
    await deleteResource(confirmDelete.id);
    setConfirmDelete(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "radial-gradient(circle at top, #1a1a1a, #000)", color: "white", px: { xs: 2, md: 6 }, py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Content Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Signed in as {user?.email}
          </Typography>
        </Box>
        <Button
          startIcon={<LogoutIcon />}
          onClick={async () => {
            await signOut();
            navigate("/");
          }}
          sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
          variant="outlined"
        >
          Sign Out
        </Button>
      </Stack>

      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        textColor="inherit"
        TabIndicatorProps={{ sx: { backgroundColor: "#8a2be2" } }}
        sx={{ mb: 4, borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        <Tab label="Resources" />
        <Tab label="Categories" />
        <Tab label="Analytics" />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              setEditingResource(null);
              setFormOpen(true);
            }}
            sx={{ backgroundColor: "purple", mb: 3, "&:hover": { backgroundColor: "darkviolet" } }}
          >
            Add Resource
          </Button>

          {resourcesLoading && <CircularProgress sx={{ color: "purple" }} />}

          {!resourcesLoading && resources.length === 0 && (
            <Typography sx={{ opacity: 0.6 }}>No resources yet — add your first one above.</Typography>
          )}

          <Stack spacing={1.5}>
            {resources.map((r) => (
              <Stack
                key={r.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                sx={{ p: 2, borderRadius: 2, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={600} noWrap>
                    {r.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                    {categories.find((c) => c.id === r.categoryId)?.name || "Uncategorized"} · {r.type}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Chip
                    label={r.published ? "Published" : "Draft"}
                    size="small"
                    sx={{ bgcolor: r.published ? "rgba(0,200,83,0.2)" : "rgba(255,255,255,0.1)", color: "white" }}
                  />
                  <Switch
                    size="small"
                    checked={Boolean(r.published)}
                    onChange={(e) => updateResource(r.id, { published: e.target.checked })}
                  />
                  <IconButton
                    size="small"
                    sx={{ color: "white" }}
                    onClick={() => {
                      setEditingResource(r);
                      setFormOpen(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "#ff6b6b" }} onClick={() => setConfirmDelete(r)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Stack direction="row" spacing={2} mb={3}>
            <TextField
              size="small"
              placeholder="New category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              sx={{ input: { color: "white" } }}
            />
            <Button variant="contained" onClick={handleAddCategory} sx={{ backgroundColor: "purple" }}>
              Add
            </Button>
          </Stack>
          <Stack spacing={1}>
            {categories.map((cat) => (
              <Stack
                key={cat.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ p: 1.5, borderRadius: 2, background: "rgba(255,255,255,0.04)" }}
              >
                <Typography>{cat.name}</Typography>
                <IconButton size="small" sx={{ color: "#ff6b6b" }} onClick={() => deleteCategory(cat.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {tab === 2 && <AnalyticsPanel />}

      <ResourceForm open={formOpen} onClose={() => setFormOpen(false)} categories={categories} editingResource={editingResource} />

      <Dialog open={Boolean(confirmDelete)} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Delete "{confirmDelete?.title}"?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">This cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteResourceConfirmed}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
