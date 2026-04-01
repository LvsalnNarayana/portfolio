import {
    Box,
    Typography,
    Stack,
} from "@mui/material";

const latencyColor = (val) => {
    if (val < 100) return `rgba(34, 197, 94, 0.7)`;
    if (val < 300) return `rgba(234, 179, 8, 0.7)`;
    if (val < 800) return `rgba(249, 115, 22, 0.7)`;
    return `rgba(239, 68, 68, 0.7)`;
};

const LatencyHeatmap = ({ data: heatmapData }) => (
    <Box mt={2} sx={{ overflowX: "auto" }}>
        <Box
            sx={{
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 2,
                p: 3,
                minWidth: 480,
            }}
        >
            <Typography sx={{ fontSize: "0.7rem", color: "#475569", mb: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Latency Distribution by Percentile (ms)
            </Typography>

            {/* Header */}
            <Stack direction="row" mb={1}>
                <Box sx={{ width: 110, flexShrink: 0 }} />
                {heatmapData.cols.map((col) => (
                    <Box key={col} sx={{ flex: 1, textAlign: "center" }}>
                        <Typography sx={{ fontSize: "0.7rem", color: "#6366F1", fontWeight: 700 }}>
                            {col}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            {heatmapData.rows.map((row, ri) => (
                <Stack key={ri} direction="row" alignItems="center" mb={0.8}>
                    <Box sx={{ width: 110, flexShrink: 0 }}>
                        <Typography sx={{ fontSize: "0.72rem", color: "#64748B", fontFamily: "'Fira Code', monospace" }}>
                            {row}
                        </Typography>
                    </Box>
                    {heatmapData.values[ri].map((val, ci) => (
                        <Box
                            key={ci}
                            sx={{
                                flex: 1,
                                mx: 0.3,
                                height: 38,
                                background: latencyColor(val),
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography sx={{ fontSize: "0.68rem", color: "#fff", fontFamily: "'Fira Code', monospace", fontWeight: 600 }}>
                                {val >= 1000 ? `${(val / 1000).toFixed(1)}s` : `${val}`}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            ))}

            {/* Legend */}
            <Stack direction="row" spacing={2} mt={2}>
                {[
                    { color: "rgba(34,197,94,0.7)", label: "< 100ms" },
                    { color: "rgba(234,179,8,0.7)", label: "100–300ms" },
                    { color: "rgba(249,115,22,0.7)", label: "300–800ms" },
                    { color: "rgba(239,68,68,0.7)", label: "> 800ms" },
                ].map((l) => (
                    <Stack key={l.label} direction="row" alignItems="center" spacing={0.8}>
                        <Box sx={{ width: 10, height: 10, borderRadius: "2px", background: l.color }} />
                        <Typography sx={{ fontSize: "0.68rem", color: "#475569", fontFamily: "'Fira Code', monospace" }}>
                            {l.label}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Box>
    </Box>
);
export default LatencyHeatmap;