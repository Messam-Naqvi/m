import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Paper, CircularProgress, Tooltip } from "@mui/material";
import { getAnalyticsSummary } from "../../firebase/analytics";

const AnalyticsPanel = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAnalyticsSummary(14)
      .then(setData)
      .catch(() => setError("Couldn't load analytics."));
  }, []);

  if (error) {
    return <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>{error}</Typography>;
  }

  if (!data) {
    return <CircularProgress sx={{ color: "purple" }} />;
  }

  const totalVisits = data.reduce((sum, d) => sum + d.totalVisits, 0);
  const totalDistinct = data.reduce((sum, d) => sum + d.distinctVisitors, 0);
  const maxVisits = Math.max(1, ...data.map((d) => d.totalVisits));

  return (
    <Box>
      <Stack direction="row" spacing={2} mb={4} flexWrap="wrap" useFlexGap>
        <Paper sx={{ p: 2.5, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, minWidth: 160 }}>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Total visits (14d)
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ color: "white" }}>
            {totalVisits}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2.5, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, minWidth: 160 }}>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Distinct visitors (14d, summed)
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ color: "white" }}>
            {totalDistinct}
          </Typography>
        </Paper>
      </Stack>

      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", mb: 1, display: "block" }}>
        Daily total visits vs. distinct visitors
      </Typography>
      <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ height: 160, overflowX: "auto", pb: 1 }}>
        {data.map((d) => (
          <Tooltip
            key={d.date}
            title={`${d.date}: ${d.totalVisits} visits, ${d.distinctVisitors} distinct`}
          >
            <Stack alignItems="center" spacing={0.5} sx={{ minWidth: 24 }}>
              <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.5, height: 120 }}>
                <Box
                  sx={{
                    width: 8,
                    height: `${(d.totalVisits / maxVisits) * 100}%`,
                    minHeight: 2,
                    bgcolor: "#8a2be2",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: `${(d.distinctVisitors / maxVisits) * 100}%`,
                    minHeight: 2,
                    bgcolor: "#4b0082",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem" }}>
                {d.date.slice(5)}
              </Typography>
            </Stack>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default AnalyticsPanel;
