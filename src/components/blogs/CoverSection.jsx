import {
    Box,
    Typography,
    Chip,
    Container,
    Link,
    Button,
    Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import CategoryTag from "../shared/CategoryTag";

/* ============================================================
   COVER SECTION
============================================================ */
const getRandomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];
    return colors[Math.floor(Math.random() * colors.length)];
};
const CoverSection = ({ blogData }) => {
    return (
        <Box
            sx={{
                mt: 20,
                position: "relative",
            }}
        >
            <Container maxWidth="xl" sx={{ position: "relative" }}>
                {/* Tags */}
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={2} gap={1}>
                    {blogData.tags.map((tag) => (
                        <CategoryTag key={tag} data={{ tag, getRandomColor }} />
                    ))}
                </Stack>

                {/* Title */}
                <Typography
                    variant="h2"
                    fontWeight={800}
                    sx={{
                        fontSize: "clamp(1.8rem, 5vw, 3rem)",
                        lineHeight: 1.15,
                        letterSpacing: "0.02em",
                        color: "text.primary",
                        maxWidth: 800,
                        mb: 2,
                    }}
                >
                    {blogData.title}
                </Typography>

                {/* Subtitle */}
                <Typography
                    sx={{
                        color: "text.secondary",
                        maxWidth: 680,
                        lineHeight: 1.7,
                        fontSize: "1rem",
                        mb: 3,
                        letterSpacing: "0.02rem",
                    }}
                >
                    {blogData.subtitle}
                </Typography>

                {/* Meta row */}
                <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" gap={2}>
                    {/* <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                fontSize: "0.85rem",
                                fontWeight: 700,
                            }}
                        >
                            {blogData.author.avatar}
                        </Avatar>
                        <Box>
                            <Typography sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                                {blogData.author.name}
                            </Typography>
                            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                                {blogData.date}
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                            {blogData.readTime}
                        </Typography>
                    </Stack> */}

                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<GitHubIcon />}
                        component={Link}
                        href={blogData.github}
                        target="_blank"
                        sx={{
                            borderColor: "primary.main",
                            color: "primary.main",
                            fontSize: "0.75rem",
                            "&:hover": {
                                borderColor: "primary.main",
                                bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                            },
                        }}
                    >
                        View on GitHub
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default CoverSection;