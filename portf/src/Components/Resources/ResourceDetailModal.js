import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Chip, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";

const ResourceDetailModal = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <Dialog
      open={Boolean(resource)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { backgroundColor: "#0b0b12", color: "white", borderRadius: 3, border: "1px solid rgba(255,255,255,0.1)" } }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", pr: 6 }}>
        {resource.title}
        <IconButton onClick={onClose} sx={{ color: "white", position: "absolute", right: 12, top: 12 }} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
          {resource.type === "note" ? resource.body || resource.description : resource.description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
          {(resource.tags || []).map((tag) => (
            <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "rgba(138,43,226,0.15)", color: "#fff" }} />
          ))}
        </Stack>
      </DialogContent>
      {resource.type === "link" && resource.url && (
        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            endIcon={<LaunchIcon />}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ backgroundColor: "purple", "&:hover": { backgroundColor: "darkviolet" } }}
          >
            Open Link
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ResourceDetailModal;
