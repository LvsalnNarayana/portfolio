import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    LinearProgress,
    Stack,
} from "@mui/material";

const scoreColor = (s) => {
    if (s >= 85) return "#22C55E";
    if (s >= 65) return "#EAB308";
    return "#EF4444";
};

const ComparisonTable = ({ data: comparisonData }) => (
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
                        {["Strategy", "Distribution", "Latency Fairness", "Session Affinity", "Complexity", "Best For", "Score"].map(
                            (h) => (
                                <TableCell
                                    key={h}
                                    sx={{
                                        color: "primary.dark",
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
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comparisonData.map((row, i) => {
                        const isSelected = row.strategy.includes("✓");
                        return (
                            <TableRow
                                key={i}
                                sx={{
                                    background: isSelected ? "rgba(99,102,241,0.06)" : "transparent",
                                    "&:hover": { background: "rgba(99,102,241,0.04)" },
                                    borderLeft: isSelected ? "2px solid #6366F1" : "2px solid transparent",
                                }}
                            >
                                <TableCell
                                    sx={{
                                        // color: isSelected ? "#A5B4FC" : "#E2E8F0",
                                        color: isSelected ? "primary.dark" : "text.secondary",
                                        fontSize: "0.82rem",
                                        fontWeight: isSelected ? 700 : 500,
                                        borderBottom: "1px solid #0F172A",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {row.strategy}
                                </TableCell>
                                {[row.distribution, row.latencyFairness, row.sessionAffinity, row.complexity, row.bestFor].map(
                                    (cell, ci) => (
                                        <TableCell
                                            key={ci}
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: "0.78rem",
                                                borderBottom: "1px solid #0F172A",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {cell}
                                        </TableCell>
                                    )
                                )}
                                <TableCell sx={{ borderBottom: "1px solid #0F172A", minWidth: 120 }}>
                                    <Stack spacing={0.5}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography sx={{ fontSize: "0.72rem", color: scoreColor(row.score), fontFamily: "'Fira Code', monospace", fontWeight: 700 }}>
                                                {row.score}/100
                                            </Typography>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={row.score}
                                            sx={{
                                                height: 5,
                                                borderRadius: 4,
                                                background: "#1E293B",
                                                "& .MuiLinearProgress-bar": {
                                                    background: scoreColor(row.score),
                                                    borderRadius: 4,
                                                },
                                            }}
                                        />
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <Typography sx={{ fontSize: "0.72rem", color: "#334155", mt: 1.5, }}>
            ✓ = Strategy used in this case study · Score based on p95 latency, error rate, and fairness under mixed load
        </Typography>
    </Box>
);

export default ComparisonTable;