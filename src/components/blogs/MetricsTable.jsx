import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    useTheme,
} from "@mui/material";


const statusColor = {
    fail: { bg: "rgba(239,68,68,0.1)", border: "#EF4444", text: "#FCA5A5", label: "FAIL" },
    partial: { bg: "rgba(234,179,8,0.1)", border: "#EAB308", text: "#FDE047", label: "PARTIAL" },
    pass: { bg: "rgba(34,197,94,0.1)", border: "#22C55E", text: "#86EFAC", label: "PASS" },
};

const MetricsTable = ({ data: metricsData }) => {
    const theme = useTheme();
    return (
        <Box mt={2}>
            <TableContainer
                sx={{
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: 2,
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: "rgba(99,102,241,0.08)" }}>
                            {["Scenario", "Replicas", "Config", "RPS", "p50", "p95 ▾", "p99", "Error Rate", ""].map((h) => (
                                <TableCell
                                    key={h}
                                    sx={{
                                        color: theme.palette.mode == "light" ? "primary.dark" : "primary.light",
                                        fontSize: "0.7rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        borderBottom: "1px solid rgba(99,102,241,0.2)",
                                        py: 1.5,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {h}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {metricsData.map((row, i) => {
                            const sc = statusColor[row.status];
                            return (
                                <TableRow
                                    key={i}
                                    sx={{
                                        "&:hover": { background: "rgba(99,102,241,0.04)" },
                                        borderBottom: i < metricsData.length - 1 ? "1px solid #0F172A" : "none",
                                    }}
                                >
                                    {[row.scenario, row.replicas, row.config, row.rps, row.p50, row.p95, row.p99, row.errorRate].map(
                                        (cell, ci) => (
                                            <TableCell
                                                key={ci}
                                                sx={{
                                                    color: "text.secondary",
                                                    fontSize: "0.8rem",
                                                    borderBottom: "none",
                                                    py: 1.5,
                                                    fontWeight: ci === 0 ? 600 : 400,
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {cell}
                                            </TableCell>
                                        )
                                    )}
                                    <TableCell sx={{ borderBottom: "none", py: 1.5 }}>
                                        <Box
                                            sx={{
                                                display: "inline-block",
                                                px: 1.2,
                                                py: 0.3,
                                                borderRadius: 1,
                                                background: sc.bg,
                                                border: `1px solid ${sc.border}`,
                                                color: sc.text,
                                                fontSize: "0.65rem",
                                                fontWeight: 700,
                                                letterSpacing: "0.1em",
                                            }}
                                        >
                                            {sc.label}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography sx={{ fontSize: "0.72rem", color: "#334155", mt: 1.5, fontFamily: "'Fira Code', monospace" }}>
                Target: p95 &lt; 200ms · Error rate &lt; 0.5% · K6 scenarios — 10 min sustained at 1,000 VUs
            </Typography>
        </Box>
    )
};

export default MetricsTable;