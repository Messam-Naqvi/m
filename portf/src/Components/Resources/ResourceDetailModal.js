import React from "react";
import { Dialog, DialogContent, DialogActions, Typography, Button, Chip, Stack, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import NotesIcon from "@mui/icons-material/Notes";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const TYPE_META = {
  link: { icon: <LinkIcon fontSize="small" />, label: "Link" },
  file: { icon: <PictureAsPdfIcon fontSize="small" />, label: "PDF" },
  note: { icon: <NotesIcon fontSize="small" />, label: "Note" },
};

const ResourceDetailModal = ({ resource, onClose }) => {
  if (!resource) return null;

  const meta = TYPE_META[resource.type] || TYPE_META.note;
  const hasTags = (resource.tags || []).length > 0;
  const hasAction = (resource.type === "link" || resource.type === "file") && resource.url;

  return (
    <Dialog
      open={Boolean(resource)}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { backgroundColor: "#0b0b12", color: "white", borderRadius: 3, border: "1px solid rgba(255,255,255,0.1)" } }}
    >
      <Box sx={{ p: 3, pb: hasAction ? 2 : 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#c9a6ff" }}>
            {meta.icon}
            <Typography variant="caption" sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
              {meta.label}
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small" sx={{ color: "white", mt: -0.5, mr: -0.5 }} aria-label="Close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>
          {resource.title}
        </Typography>

        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            {resource.type === "note" ? resource.body || resource.description : resource.description}
          </Typography>
        </DialogContent>

        {hasTags && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
            {resource.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "rgba(138,43,226,0.15)", color: "#fff" }} />
            ))}
          </Stack>
        )}

        {hasAction && (
          <DialogActions sx={{ p: 0, pt: 2.5 }}>
            <Button
              variant="contained"
              fullWidth
              endIcon={resource.type === "file" ? <DownloadIcon /> : <LaunchIcon />}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ backgroundColor: "purple", py: 1.2, "&:hover": { backgroundColor: "darkviolet" } }}
            >
              {resource.type === "file" ? "Download PDF" : "Open Link"}
            </Button>
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
};

export default ResourceDetailModal;
