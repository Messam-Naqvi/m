import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import DescriptionIcon from "@mui/icons-material/Description";
import NotesIcon from "@mui/icons-material/Notes";
import { motion } from "framer-motion";

const TYPE_ICON = {
  link: <LinkIcon fontSize="small" />,
  file: <DescriptionIcon fontSize="small" />,
  note: <NotesIcon fontSize="small" />,
};

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "";
  return timestamp.toDate().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const ResourceCard = ({ resource, onOpen }) => {
  return (
    <motion.div whileHover={{ y: -4 }} style={{ height: "100%" }}>
      <Box
        onClick={() => onOpen(resource)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen(resource)}
        sx={{
          height: "100%",
          p: 3,
          borderRadius: 3,
          cursor: "pointer",
          background: "linear-gradient(135deg, rgba(75,0,130,0.18), rgba(0,0,0,0.7))",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          "&:hover": { borderColor: "rgba(138,43,226,0.6)" },
          "&:focus-visible": { outline: "2px solid #8a2be2" },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#c9a6ff" }}>
          {TYPE_ICON[resource.type] || <NotesIcon fontSize="small" />}
          <Typography variant="caption" sx={{ textTransform: "uppercase", letterSpacing: 1, opacity: 0.8 }}>
            {resource.subcategory || resource.type}
          </Typography>
        </Stack>

        <Typography fontWeight={700} sx={{ color: "white" }}>
          {resource.title}
        </Typography>

        <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", flexGrow: 1 }}>
          {resource.description?.length > 140
            ? `${resource.description.slice(0, 140)}…`
            : resource.description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {(resource.tags || []).slice(0, 4).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ bgcolor: "rgba(138,43,226,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}
            />
          ))}
        </Stack>

        {resource.createdAt && (
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
            {formatDate(resource.createdAt)}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default ResourceCard;
