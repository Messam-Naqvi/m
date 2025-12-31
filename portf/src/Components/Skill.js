import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Button,
  Divider,
  Chip,
  LinearProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const skillData = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", level: "Expert", projects: 12, confidence: 95 },
      { name: "CSS / Tailwind", level: "Expert", projects: 10, confidence: 92 },
      { name: "JavaScript", level: "Advanced", projects: 11, confidence: 88 },
      { name: "React.js", level: "Advanced", projects: 9, confidence: 85 },
      { name: "Material UI", level: "Advanced", projects: 7, confidence: 82 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: "Advanced", projects: 8, confidence: 85 },
      { name: "Express.js", level: "Advanced", projects: 7, confidence: 83 },
      { name: "REST APIs", level: "Expert", projects: 9, confidence: 92 },
      { name: "MongoDB", level: "Advanced", projects: 8, confidence: 86 },
      { name: "PostgreSQL", level: "Expert", projects: 10, confidence: 94 },
    ],
  },
  {
    category: "Core CS",
    skills: [
      { name: "OOP", level: "Expert", projects: 10, confidence: 93 },
      { name: "Data Structures", level: "Advanced", projects: 8, confidence: 87 },
      { name: "Algorithms", level: "Advanced", projects: 7, confidence: 84 },
      { name: "Git / GitHub", level: "Advanced", projects: 9, confidence: 88 },
    ],
  },
  {
    category: "Data & AI",
    skills: [
      { name: "Python", level: "Advanced", projects: 8, confidence: 86 },
      { name: "Pandas / NumPy", level: "Intermediate", projects: 6, confidence: 75 },
      { name: "ML Fundamentals", level: "Intermediate", projects: 5, confidence: 72 },
    ],
  },
];

const levelColors = {
  Expert: "#8a2be2",
  Advanced: "#6a0dad",
  Intermediate: "#555",
};

const Skill = () => {
  const [activeCategory, setActiveCategory] = useState(skillData[0].category);
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  const activeSkills =
    skillData.find((c) => c.category === activeCategory)?.skills || [];

  const filteredSkills = useMemo(() => {
    return activeSkills.filter((skill) => {
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesLevel =
        levelFilter === "All" || skill.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [activeSkills, search, levelFilter]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1a1a1a, #000)",
        color: "#fff",
        px: { xs: 2, md: 8 },
        py: 10,
      }}
    >
      {/* Header */}
      <Typography variant="h3" fontWeight={800} textAlign="center">
        Skill Stack
      </Typography>
      <Typography
        textAlign="center"
        color="rgba(255,255,255,0.65)"
        maxWidth={620}
        mx="auto"
        mt={1}
        mb={6}
      >
        Skills refined through real projects, production challenges, and
        continuous learning.
      </Typography>

      {/* Controls */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        mb={8}
      >
        <TextField
          placeholder="Search skills…"
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
          sx={{
            maxWidth: 260,
            input: { color: "#fff" },
            "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
          }}
        />

        <Stack direction="row" spacing={1} alignItems="center">
          <FilterAltIcon sx={{ opacity: 0.6 }} />
          {["All", "Expert", "Advanced", "Intermediate"].map((lvl) => (
            <Chip
              key={lvl}
              label={lvl}
              clickable
              onClick={() => setLevelFilter(lvl)}
              sx={{
                bgcolor:
                  levelFilter === lvl
                    ? "rgba(138,43,226,0.25)"
                    : "rgba(255,255,255,0.06)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Grid container spacing={6}>
        {/* Categories */}
        <Grid item xs={12} md={3}>
          <Stack spacing={1.5} sx={{ position: "sticky", top: 100 }}>
            {skillData.map((cat) => (
              <Box
                key={cat.category}
                onClick={() => {
                  setActiveCategory(cat.category);
                  setExpandedSkill(null);
                }}
                sx={{
                  cursor: "pointer",
                  px: 3,
                  py: 1.6,
                  borderRadius: 2,
                  background:
                    activeCategory === cat.category
                      ? "linear-gradient(90deg, #4b0082, #8a2be2)"
                      : "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Typography fontWeight={600}>{cat.category}</Typography>
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Skills */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {filteredSkills.map((skill) => {
              const open = expandedSkill === skill.name;

              return (
                <Grid item xs={12} sm={6} md={4} key={skill.name}>
                  <motion.div whileHover={{ y: -4 }}>
                    <Box
                      onClick={() =>
                        setExpandedSkill(open ? null : skill.name)
                      }
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        cursor: "pointer",
                        background:
                          "linear-gradient(135deg, rgba(75,0,130,0.18), rgba(0,0,0,0.7))",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <Typography fontWeight={700}>{skill.name}</Typography>

                      <Chip
                        label={skill.level}
                        size="small"
                        sx={{
                          mt: 1,
                          bgcolor: `${levelColors[skill.level]}33`,
                          color: "#fff",
                        }}
                      />

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <Divider
                              sx={{
                                my: 2,
                                borderColor: "rgba(255,255,255,0.1)",
                              }}
                            />
                            <Typography fontSize="0.85rem" mb={1}>
                              Used in <strong>{skill.projects}</strong> projects
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={skill.confidence}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor:
                                  "rgba(255,255,255,0.1)",
                                "& .MuiLinearProgress-bar": {
                                  background:
                                    "linear-gradient(90deg, #4b0082, #8a2be2)",
                                },
                              }}
                            />
                            <Typography
                              fontSize="0.75rem"
                              mt={0.5}
                              opacity={0.7}
                            >
                              Confidence: {skill.confidence}%
                            </Typography>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      {/* CTA */}
      <Box mt={10} textAlign="center">
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          href="https://www.linkedin.com/posts/messamnaqvi_mernstack-fullstack-uetlahore-activity-7118596221300031488-PvsH"
          target="_blank"
          sx={{
            borderColor: "#8a2be2",
            color: "#fff",
            px: 4,
            "&:hover": {
              background: "rgba(138,43,226,0.15)",
            },
          }}
        >
          View Certifications
        </Button>
      </Box>
    </Box>
  );
};

export default Skill;
