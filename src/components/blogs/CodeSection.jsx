import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Tooltip,
    Stack,
    Paper,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
/* ============================================================
   CODE SECTION — tabbed snippets with copy
============================================================ */


const CodeSection = ({ snippets }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[activeTab].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Box mt={2}>
            {/* Tabs */}
            <Stack direction="row" sx={{ pb: 1, borderBottom: "1px solid #1E293B", overflowX: "auto" }}>
                {snippets.map((s, i) => (
                    <Button
                        key={i}
                        onClick={() => { setActiveTab(i); setCopied(false); }}
                        disableRipple
                        sx={{
                            textTransform: "none",
                            fontSize: "0.9rem",
                            px: 2,
                            py: 1.2,
                            minWidth: "auto",
                            whiteSpace: "nowrap",
                            color: activeTab === i ? "primary.dark" : "#475569",
                            borderBottomWidth: "2px",
                            borderBottomColor: activeTab === i ? "primary.dark" : "transparent",
                            borderBottomStyle: "solid",
                            borderRadius: 0,
                            "&:hover": { color: "#94A3B8", background: "transparent" },
                        }}
                    >
                        {s.label}
                    </Button>
                ))}
            </Stack>

            {/* Code block */}
            <Paper
                sx={{
                    border: "1px solid #1E293B",
                    borderTop: "none",
                    borderRadius: "0 0 8px 8px",
                    position: "relative",
                }}
            >
                {/* Top bar */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ px: 2, py: 1, borderBottom: "1px solid #0F172A" }}
                >
                    <Stack direction="row" spacing={0.8}>
                        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                            <Box key={c} sx={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                        ))}
                    </Stack>
                    <Typography sx={{ fontSize: "0.7rem", color: "#334155", fontFamily: "'Fira Code', monospace" }}>
                        {snippets[activeTab].language}
                    </Typography>
                    <Tooltip title={copied ? "Copied!" : "Copy"}>
                        <IconButton
                            size="small"
                            onClick={handleCopy}
                            sx={{ color: copied ? "#22D3EE" : "#475569", "&:hover": { color: "#94A3B8" } }}
                        >
                            {copied ? <CheckIcon sx={{ fontSize: 15 }} /> : <ContentCopyIcon sx={{ fontSize: 15 }} />}
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Box sx={{ overflowX: "auto" }}>
                    <pre
                        style={{
                            margin: 0,
                            padding: "20px 24px",
                            color: "#7DD3FC",
                            fontSize: "0.82rem",
                            lineHeight: 1.75,
                            fontFamily: "'Fira Code', monospace",
                        }}
                    >
                        {snippets[activeTab].code}
                    </pre>
                </Box>
            </Paper>
        </Box>
    );
};


export default CodeSection;