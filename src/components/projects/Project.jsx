import React, { useCallback, useEffect, useState } from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Chip,
    Button,
    Paper,
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useEmblaCarousel from "embla-carousel-react";

/* =========================
   FONT INJECTION
========================= */
const FontLoader = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Manrope', sans-serif; }
    `}</style>
);


/* =========================
   PROJECT DATA
========================= */
const projectData = {
    title: "SyncDocs",
    subtitle: "Real-Time Collaborative Editor",
    tagline:
        "A browser-native Google Docs clone engineered for simultaneous multi-user editing — conflict-free, offline-capable, and production-ready.",
    banner:
        "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=2039",
    links: {
        live: "https://syncdocs-demo.com",
        github: "https://github.com/your-username/syncdocs",
    },
    meta: {
        role: "Lead Frontend Engineer",
        timeline: "8 Weeks",
        type: "Personal Project",
        status: "Live",
    },
    demoImages: [
        {
            src: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800",
            label: "Editor View",
        },
        {
            src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800",
            label: "Collaboration Mode",
        },
        {
            src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800",
            label: "Version History",
        },
    ],
    techStack: [
        { library: "React 18", purpose: "UI component tree", notes: "Concurrent mode for non-blocking updates during heavy CRDT merges." },
        { library: "TypeScript", purpose: "Type safety", notes: "Strict mode; all Yjs types and WebSocket payloads are explicitly typed." },
        { library: "Zustand", purpose: "Client UI state", notes: "Stores active collaborators, cursor positions, and theme preference." },
        { library: "Quill.js", purpose: "Rich text engine", notes: "Delta format maps 1:1 to Yjs Text operations — no adapter layer needed." },
        { library: "Socket.io", purpose: "Real-time transport", notes: "Fallback to long-polling on degraded networks; reconnects transparently." },
        { library: "Yjs (CRDT)", purpose: "Conflict-free sync", notes: "Peer-to-peer merge without a coordination server; drives offline support." },
        { library: "IndexedDB", purpose: "Offline persistence", notes: "y-indexeddb provider; queues ops locally and replays on reconnect." },
        { library: "Vite", purpose: "Build tooling", notes: "HMR in dev; split chunks per route for fast initial load in prod." },
    ],
    challenge:
        "Building a browser-based editor where dozens of users can type simultaneously — without conflicts, without data loss — means solving one of the hardest distributed state problems, but entirely on the frontend.",
    overview:
        "SyncDocs is a web-based collaborative text editor that allows multiple users to work on the same document in real time. The project was built to deeply understand the frontend engineering behind tools like Google Docs — from conflict-free data structures and WebSocket event design to offline persistence and rich text rendering. Every architectural decision was driven by real constraints: latency tolerance, edge-case conflict resolution, and a seamless user experience even under degraded network conditions.",
    features: [
        {
            title: "Real-Time Collaboration",
            description:
                "Multiple users can edit simultaneously with named cursor indicators and live selection highlighting per participant.",
        },
        {
            title: "Rich Text Formatting",
            description:
                "Full editor toolbar with headings, lists, inline styles, and media embedding backed by a Delta document model.",
        },
        {
            title: "Offline-First Sync",
            description:
                "Changes are persisted locally via IndexedDB and reconciled automatically when the connection is restored.",
        },
        {
            title: "Version History",
            description:
                "Named document snapshots let users browse and restore any prior state of the document.",
        },
    ],
    architectureDecisions: [
        {
            topic: "Conflict Resolution",
            chose: "Yjs (CRDT)",
            over: "Operational Transformation",
            reason:
                "OT requires a central server to be the source of truth, adding latency and scaling complexity. CRDTs merge concurrent edits mathematically without coordination — making offline editing and peer-to-peer sync a first-class concern from day one, not an afterthought.",
        },
        {
            topic: "State Management",
            chose: "Zustand + React Query",
            over: "Redux Toolkit",
            reason:
                "Redux introduced unnecessary boilerplate for ephemeral UI state like active collaborators and theme preferences. Zustand handles that layer with minimal ceremony, while React Query owns all async document fetching with automatic caching, background refetching, and stale-while-revalidate semantics.",
        },
        {
            topic: "Editor Engine",
            chose: "Quill.js",
            over: "Raw contenteditable",
            reason:
                "Native contenteditable APIs produce wildly inconsistent DOM output across browsers. Quill's Delta format is a structured, diffable representation of document state — making it straightforward to map incoming WebSocket events directly to precise document mutations.",
        },
    ],
};

/* =========================
   HELPERS
========================= */
const SectionLabel = ({ children }) => (
    <Typography
        sx={{
            color: "primary.dark",
            fontSize: "0.8em",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            mb: 1.5,
        }}
    >
        {children}
    </Typography>
);

const SectionHeading = ({ children }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography
            sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
                color: "text.primary",
                whiteSpace: "nowrap",
            }}
        >
            {children}
        </Typography>
        <Box
            sx={{
                flex: 1,
                height: "1px",
                background: (t) =>
                    `linear-gradient(90deg, ${alpha(t.palette.primary.dark)} 100%, transparent 100%)`,
            }}
        />
    </Box>
);

const Project = () => {
    const theme = useTheme();
    const [demoEmblaRef, demoEmblaApi] = useEmblaCarousel({ loop: false });
    const [prevDemoBtnDisabled, setPrevDemoBtnDisabled] = useState(true);
    const [nextDemoBtnDisabled, setNextDemoBtnDisabled] = useState(false);

    const scrollPrevDemo = useCallback(() => demoEmblaApi?.scrollPrev(), [demoEmblaApi]);
    const scrollNextDemo = useCallback(() => demoEmblaApi?.scrollNext(), [demoEmblaApi]);

    useEffect(() => {
        if (!demoEmblaApi) return;
        const update = () => {
            setPrevDemoBtnDisabled(!demoEmblaApi.canScrollPrev());
            setNextDemoBtnDisabled(!demoEmblaApi.canScrollNext());
        };
        demoEmblaApi.on("select", update);
        update();
    }, [demoEmblaApi]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                color: "text.primary",
                pb: 4,
                backgroundSize: "32px 32px",
            }}
        >
            {/* ──────────────────── HERO ──────────────────── */}
            <Box
                sx={{
                    height: { xs: "48vh", md: "58vh" },
                    backgroundImage: `url(${projectData.banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.8)} 0%, ${alpha(theme.palette.common.black, 0.7)} 50% ,transparent 100%)`,
                    }}
                />
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10, pb: { xs: 5, md: 8 } }}>
                    <Chip
                        label={`● ${projectData.meta.status}`}
                        size="small"
                        sx={{
                            bgcolor: (t) => alpha(t.palette.success.main, 0.12),
                            color: "success.main",
                            border: (t) => `1px solid ${alpha(t.palette.success.main, 0.25)}`,
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 700,
                            mb: 2.5,
                            fontSize: "0.68rem",
                            height: 24,
                        }}
                    />
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: "2.6rem", md: "4.5rem" },
                            color: "common.white",
                            lineHeight: 1.0,
                            mb: 0.75,
                        }}
                    >
                        {projectData.title}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: "1.05rem", md: "1.55rem" },
                            color: "primary.main",
                            mb: 2,
                        }}
                    >
                        {projectData.subtitle}
                    </Typography>
                    <Typography
                        sx={{
                            color: "common.white",
                            fontWeight: 600,
                            maxWidth: "680px",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            lineHeight: 1.7,
                        }}
                    >
                        {projectData.tagline}
                    </Typography>
                </Container>
            </Box>

            {/* ──────────────────── MAIN GRID ──────────────────── */}
            <Container maxWidth="lg" sx={{ mt: { xs: 7, md: 11 } }}>
                <Grid container spacing={{ xs: 5, md: 5 }}>

                    {/* ── LEFT COLUMN ── */}
                    <Grid size={{ xs: 12, md: 8 }}>

                        {/* THE CHALLENGE */}
                        <Box
                            sx={{
                                mb: 8,
                                p: { xs: 3.5, md: 4.5 },
                                bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                                border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.14)}`,
                                borderRadius: 3,
                                position: "relative",
                                overflow: "hidden",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "4px",
                                    height: "100%",
                                    background: (t) =>
                                        `linear-gradient(180deg, ${t.palette.primary.main}, ${t.palette.primary.light})`,
                                    borderRadius: "3px 0 0 3px",
                                },
                            }}
                        >
                            <SectionLabel>The Challenge</SectionLabel>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: { xs: "1.05rem", md: "1.2rem" },
                                    fontWeight: 400,
                                    lineHeight: 1.75,
                                    fontStyle: "italic",
                                }}
                            >
                                "{projectData.challenge}"
                            </Typography>
                        </Box>

                        {/* OVERVIEW */}
                        <Box sx={{ mb: 8 }}>
                            <SectionHeading>Overview</SectionHeading>
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9, fontSize: "1.02rem", fontWeight: 400 }}>
                                {projectData.overview}
                            </Typography>
                        </Box>

                        {/* KEY FEATURES */}
                        <Box sx={{ mb: 8 }}>
                            <SectionHeading>Feature Walkthrough</SectionHeading>
                            <Stack
                                spacing={0}
                                sx={{
                                    border: (t) => `1px solid ${t.palette.divider}`,
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    bgcolor: "background.paper",
                                }}
                            >
                                {projectData.features.map((feature, idx) => (
                                    <Box
                                        key={feature.title}
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: { xs: "1fr", md: "80px 1fr" },
                                            bgcolor: (t) => alpha(t.palette.primary.main, 0.05),
                                            borderBottom:
                                                idx !== projectData.features.length - 1
                                                    ? (t) => `1px solid ${t.palette.divider}`
                                                    : "none",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                px: 2.5,
                                                py: 2,
                                                borderRight: { xs: "none", md: (t) => `1px solid ${t.palette.divider}` },
                                                bgcolor: (t) => alpha(t.palette.primary.dark, 0.1),
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "primary.lighter",
                                                    fontWeight: 800,
                                                    fontSize: "1.05rem",
                                                    letterSpacing: "0.06em",
                                                }}
                                            >
                                                {String(idx + 1).padStart(2, "0")}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: 2 }}>
                                            <Typography sx={{ color: "text.primary", fontWeight: 700, fontSize: "1rem", mb: 0.8 }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography sx={{ color: "text.muted", lineHeight: 1.7, fontSize: "0.9rem", maxWidth: "95%" }}>
                                                {feature.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        {/* TECH + LIBRARIES */}
                        <Box sx={{ mb: 8 }}>
                            <SectionHeading>Tech & Libraries</SectionHeading>
                            <TableContainer
                                component={Paper}
                                elevation={0}
                                sx={{
                                    bgcolor: "background.paper",
                                    border: (t) => `1px solid ${t.palette.divider}`,
                                    borderRadius: "14px",
                                    overflow: "hidden",
                                }}
                            >
                                <Table size="small" sx={{ minWidth: 640 }}>
                                    <TableHead>
                                        <TableRow sx={{ py: 2, bgcolor: (t) => alpha(t.palette.primary.dark, 0.1) }}>
                                            {/* , "Implementation Note" */}
                                            {["Library", "Why It Exists"].map((col) => (
                                                <TableCell
                                                    key={col}
                                                    sx={{
                                                        color: "primary.lighter",
                                                        borderBottom: (t) => `1px solid ${alpha(t.palette.primary.main, 0.2)}`,
                                                        fontWeight: 700,
                                                        fontSize: "0.72rem",
                                                        letterSpacing: "0.08em",
                                                        textTransform: "uppercase",
                                                    }}
                                                >
                                                    {col}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectData.techStack.map((item) => (
                                            <TableRow
                                                key={item.library}
                                                sx={{
                                                    "&:last-child td": { borderBottom: 0 },
                                                    "&:hover": { bgcolor: (t) => alpha(t.palette.primary.main, 0.05) },
                                                }}
                                            >
                                                <TableCell sx={{ color: "text.primary", borderColor: "divider", fontWeight: 700, fontSize: "0.86rem", whiteSpace: "nowrap" }}>
                                                    {item.library}
                                                </TableCell>
                                                <TableCell sx={{ color: "text.secondary", borderColor: "divider", fontSize: "0.84rem" }}>
                                                    {item.purpose}
                                                </TableCell>
                                                {/* <TableCell sx={{ color: "text.muted", borderColor: "divider", fontSize: "0.82rem", lineHeight: 1.7 }}>
                                                    {item.notes}
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* ARCHITECTURE DECISIONS */}
                        <Box sx={{ mb: 8 }}>
                            <SectionHeading>Architecture Decisions</SectionHeading>
                            <Stack spacing={2.5}>
                                {projectData.architectureDecisions.map((item, idx) => (
                                    <Paper
                                        elevation={0}
                                        key={idx}
                                        sx={{
                                            p: { xs: 3, md: 4 },
                                            bgcolor: "background.paper",
                                            border: (t) => `1px solid ${t.palette.divider}`,
                                            borderRadius: "14px",
                                            transition: "border-color 0.2s",
                                            // "&:hover": { borderColor: (t) => alpha(t.palette.primary.dark, 0.5) },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "'Syne', sans-serif",
                                                fontWeight: 700,
                                                color: "text.disabled",
                                                fontSize: "0.63rem",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.14em",
                                                mb: 2,
                                            }}
                                        >
                                            {item.topic}
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap", mb: 2.5 }}>
                                            <Chip
                                                label={`✓  ${item.chose}`}
                                                size="small"
                                                sx={{
                                                    bgcolor: (t) => alpha(t.palette.success.main, 0.08),
                                                    color: "success.main",
                                                    border: (t) => `1px solid ${alpha(t.palette.success.main, 0.3)}`,
                                                    fontWeight: 700,
                                                    fontSize: "0.74rem",
                                                    height: 26,
                                                    borderRadius: "8px",
                                                    letterSpacing: "0.01em",
                                                }}
                                            />
                                            <Typography sx={{ color: "text.disabled", fontSize: "0.75rem", fontWeight: 500 }}>
                                                over
                                            </Typography>
                                            <Chip
                                                label={item.over}
                                                size="small"
                                                sx={{
                                                    bgcolor: (t) => alpha(t.palette.error.main, 0.08),
                                                    color: "error.main",
                                                    border: (t) => `1px solid ${alpha(t.palette.error.main, 0.3)}`,
                                                    fontWeight: 500,
                                                    fontSize: "0.74rem",
                                                    height: 26,
                                                    borderRadius: "8px",
                                                }}
                                            />
                                        </Box>
                                        <Typography sx={{ color: "text.muted", lineHeight: 1.8, fontSize: "0.9rem" }}>
                                            {item.reason}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>
                        {/* Demo Screens Carousel */}
                        <Box sx={{ mb: 3.5 }}>

                            <SectionHeading>Demo Screens</SectionHeading>
                            <Box sx={{ position: "relative" }}>
                                {[
                                    { side: "left", action: scrollPrevDemo, disabled: prevDemoBtnDisabled, icon: <ArrowBackIosNewIcon sx={{ fontSize: "0.95rem" }} />, label: "Previous demo image" },
                                    { side: "right", action: scrollNextDemo, disabled: nextDemoBtnDisabled, icon: <ArrowForwardIosIcon sx={{ fontSize: "0.95rem" }} />, label: "Next demo image" },
                                ].map(({ side, action, disabled, icon, label }) => (
                                    <IconButton
                                        key={side}
                                        disableRipple
                                        onClick={action}
                                        disabled={disabled}
                                        aria-label={label}
                                        sx={{
                                            position: "absolute",
                                            [side]: -10,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            bgcolor: (t) => alpha(t.palette.background.default, 0.85),
                                            border: (t) => `1px solid ${t.palette.divider}`,
                                            color: "primary.lighter",
                                            width: 40,
                                            height: 40,
                                            zIndex: 5,
                                        }}
                                    >
                                        {icon}
                                    </IconButton>
                                ))}
                                <Box
                                    ref={demoEmblaRef}
                                    sx={{
                                        overflow: "hidden",
                                        borderRadius: "14px",
                                        border: (t) => `1px solid ${t.palette.divider}`,
                                    }}
                                >
                                    <Box sx={{ display: "flex" }}>
                                        {projectData.demoImages.map((img) => (
                                            <Box key={img.src} sx={{ flex: "0 0 100%", minWidth: 0 }}>
                                                <Box sx={{ position: "relative", height: 500, bgcolor: "background.default" }}>
                                                    <Box
                                                        component="img"
                                                        src={img.src}
                                                        alt={img.label}
                                                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                                    />
                                                    <Box
                                                        aria-hidden
                                                        sx={{
                                                            position: "absolute",
                                                            inset: 0,
                                                            background: `linear-gradient(to top, #000 0%, #00000020 45%, transparent 100%)`,
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            position: "absolute",
                                                            left: 12,
                                                            right: 12,
                                                            bottom: 10,
                                                            zIndex: 2,
                                                            color: "text.primary",
                                                            fontWeight: 800,
                                                            fontSize: "0.83rem",
                                                        }}
                                                    >
                                                        {img.label}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                    </Grid>

                    {/* ── RIGHT COLUMN: STICKY SIDEBAR ── */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ position: "sticky", top: 120 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    bgcolor: (t) => alpha(t.palette.background.paper, 0.85),
                                    backdropFilter: "blur(20px)",
                                    border: (t) => `1px solid ${t.palette.divider}`,
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: "3px",
                                        background: (t) =>
                                            `linear-gradient(90deg, ${t.palette.primary.dark} 0%, ${t.palette.primary.light} 60%, ${t.palette.primary.lighter} 100%)`,
                                    }}
                                />
                                <Box sx={{ p: { xs: 3, md: 3.5 } }}>

                                    {/* CTA Buttons */}
                                    <Stack spacing={1.5} sx={{ mb: 3 }}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            endIcon={<OpenInNewRoundedIcon sx={{ fontSize: "0.95rem !important" }} />}
                                            href={projectData.links.live}
                                            target="_blank"
                                            disableElevation
                                            sx={{
                                                background: (t) =>
                                                    `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${t.palette.primary.dark} 100%)`,
                                                color: "common.white",
                                                fontWeight: 700,
                                                py: 1.5,
                                                fontFamily: "'Manrope', sans-serif",
                                                textTransform: "none",
                                                fontSize: "0.9rem",
                                                borderRadius: "10px",
                                                letterSpacing: "0.01em",
                                            }}
                                        >
                                            View Live Demo
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<GitHubIcon sx={{ fontSize: "1rem !important" }} />}
                                            href={projectData.links.github}
                                            target="_blank"
                                            sx={{
                                                color: "text.secondary",
                                                borderColor: "divider",
                                                fontFamily: "'Manrope', sans-serif",
                                                textTransform: "none",
                                                fontWeight: 600,
                                                py: 1.4,
                                                borderRadius: "10px",
                                                fontSize: "0.9rem",
                                                "&:hover": {
                                                    borderColor: (t) => alpha(t.palette.primary.main, 0.4),
                                                    color: "primary.lighter",
                                                    bgcolor: (t) => alpha(t.palette.primary.main, 0.05),
                                                },
                                            }}
                                        >
                                            View Source
                                        </Button>
                                    </Stack>


                                    <Divider sx={{ borderColor: "divider", mb: 3 }} />

                                    {/* Meta details */}
                                    {/* Meta details */}
                                    <Table size="small" sx={{ mb: 3.5 }}>
                                        <TableBody>
                                            {[
                                                { label: "Role", value: projectData.meta.role },
                                                { label: "Timeline", value: projectData.meta.timeline },
                                                { label: "Type", value: projectData.meta.type },
                                            ].map(({ label, value }) => (
                                                <TableRow key={label} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                                                    <TableCell
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontSize: "0.8rem",
                                                            fontWeight: 700,
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.1em",
                                                            borderColor: "divider",
                                                            pl: 0,
                                                            width: "40%",
                                                        }}
                                                    >
                                                        {label}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontSize: "0.8rem",
                                                            fontWeight: 600,
                                                            borderColor: "divider",
                                                            pr: 0,
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    <Divider sx={{ borderColor: "divider", mb: 3 }} />

                                    {/* Tech Stack */}
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: "text.disabled",
                                                fontSize: "0.63rem",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.13em",
                                                mb: 2,
                                            }}
                                        >
                                            Tech Stack
                                        </Typography>
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                            {projectData.techStack.map((tech) => (
                                                <Chip
                                                    key={tech.library}
                                                    label={tech.library}
                                                    size="small"
                                                    sx={{
                                                        py: 1,
                                                        px: 1,
                                                        bgcolor: (t) => alpha(t.palette.background.default, 0.8),
                                                        color: "text.muted",
                                                        border: (t) => `1px solid ${t.palette.divider}`,
                                                        borderRadius: "8px",
                                                        fontWeight: 600,
                                                        fontSize: "0.73rem",
                                                        fontFamily: "'Manrope', sans-serif",
                                                        transition: "all 0.18s ease",
                                                        cursor: "default",
                                                        "&:hover": {
                                                            bgcolor: (t) => alpha(t.palette.primary.main, 0.09),
                                                            borderColor: (t) => alpha(t.palette.primary.main, 0.28),
                                                            color: "primary.lighter",
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
};

export default Project;