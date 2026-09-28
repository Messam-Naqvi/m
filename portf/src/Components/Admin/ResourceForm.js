import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Chip,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Switch,
  FormControlLabel,
  Alert,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addResource, updateResource } from "../../firebase/firestore";
import { uploadPdf } from "../../cloudinary/upload";

const EMPTY = {
  title: "",
  description: "",
  categoryId: "",
  categorySlug: "",
  subcategory: "",
  tags: [],
  type: "link",
  url: "",
  body: "",
  published: false,
};

// PDF uploads go through Cloudinary's free tier (see ../../cloudinary/upload.js)
// since Firebase Storage now requires the paid Blaze plan.
const ResourceForm = ({ open, onClose, categories, editingResource }) => {
  const [form, setForm] = useState(EMPTY);
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(editingResource ? { ...EMPTY, ...editingResource } : EMPTY);
    setFile(null);
    setUploadProgress(null);
    setError(null);
  }, [editingResource, open]);

  const handleCategoryChange = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    setForm((f) => ({ ...f, categoryId, categorySlug: cat?.slug || "" }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
    }
    setTagInput("");
  };

  const removeTag = (tag) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.description || !form.categoryId) {
      setError("Title, description, and category are required.");
      return;
    }
    if (form.type === "link" && !form.url) {
      setError("Please provide a URL for this link.");
      return;
    }
    if (form.type === "file" && !file && !form.url) {
      setError("Please choose a PDF to upload.");
      return;
    }

    setSaving(true);
    try {
      let payload = form;

      if (form.type === "file" && file) {
        const uploaded = await uploadPdf(file, setUploadProgress);
        payload = { ...form, ...uploaded };
      }

      if (editingResource) {
        await updateResource(editingResource.id, payload);
      } else {
        await addResource(payload);
      }
      onClose();
    } catch (err) {
      setError(err.message || "Could not save this resource. Please try again.");
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 440 }, backgroundColor: "#0b0b12", color: "white", p: 3 } }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {editingResource ? "Edit Resource" : "Add Resource"}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
          fullWidth
          sx={{ input: { color: "white" }, label: { color: "rgba(255,255,255,0.6)" } }}
        />

        <TextField
          label="Description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          required
          fullWidth
          multiline
          minRows={3}
          sx={{ textarea: { color: "white" }, label: { color: "rgba(255,255,255,0.6)" } }}
        />

        <TextField
          select
          label="Category"
          value={form.categoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
          required
          fullWidth
          sx={{ color: "white", label: { color: "rgba(255,255,255,0.6)" } }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Subcategory (optional, e.g. course code)"
          value={form.subcategory}
          onChange={(e) => setForm((f) => ({ ...f, subcategory: e.target.value }))}
          fullWidth
          sx={{ input: { color: "white" }, label: { color: "rgba(255,255,255,0.6)" } }}
        />

        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Tags
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1, mb: 1 }}>
            {form.tags.map((tag) => (
              <Chip key={tag} label={tag} onDelete={() => removeTag(tag)} size="small" sx={{ bgcolor: "rgba(138,43,226,0.2)", color: "white" }} />
            ))}
          </Stack>
          <TextField
            size="small"
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            fullWidth
            sx={{ input: { color: "white" } }}
          />
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Type
          </Typography>
          <ToggleButtonGroup
            value={form.type}
            exclusive
            onChange={(e, val) => val && setForm((f) => ({ ...f, type: val }))}
            fullWidth
            sx={{ mt: 1, "& .MuiToggleButton-root": { color: "white", borderColor: "rgba(255,255,255,0.2)" } }}
          >
            <ToggleButton value="link">Link</ToggleButton>
            <ToggleButton value="file">PDF</ToggleButton>
            <ToggleButton value="note">Note</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {form.type === "link" && (
          <TextField
            label="URL"
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            required
            fullWidth
            sx={{ input: { color: "white" }, label: { color: "rgba(255,255,255,0.6)" } }}
          />
        )}

        {form.type === "file" && (
          <Box>
            <Button component="label" variant="outlined" sx={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
              {file ? file.name : form.fileName ? `Replace "${form.fileName}"` : "Choose PDF"}
              <input type="file" accept="application/pdf" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </Button>
            {uploadProgress !== null && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 1 }} />}
          </Box>
        )}

        {form.type === "note" && (
          <TextField
            label="Note content"
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            fullWidth
            multiline
            minRows={4}
            sx={{ textarea: { color: "white" }, label: { color: "rgba(255,255,255,0.6)" } }}
          />
        )}

        <FormControlLabel
          control={
            <Switch
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
          }
          label="Published (visible to visitors)"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={saving}
          sx={{ backgroundColor: "purple", py: 1.3, "&:hover": { backgroundColor: "darkviolet" } }}
        >
          {saving ? "Saving…" : "Save Resource"}
        </Button>
      </Box>
    </Drawer>
  );
};

export default ResourceForm;
