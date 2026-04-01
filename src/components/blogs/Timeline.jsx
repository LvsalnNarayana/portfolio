import {
    Box,
    Typography,
    Stack,
    useTheme,
} from "@mui/material";


const Timeline = ({ data: timelineData }) => {
    const theme = useTheme();
    return (
        <Box mt={2}>
            {timelineData.map((item, i) => (
                <Stack key={i} direction="row" spacing={3} mb={i < timelineData.length - 1 ? 0 : 0} sx={{ position: "relative" }}>
                    {/* Line + dot */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                                // border: "2px solid #1E293B",
                                mt: 0.4,
                                flexShrink: 0,
                                zIndex: 1,
                            }}
                        />
                        {i < timelineData.length - 1 && (
                            <Box sx={{ width: "2px", flex: 1, background: `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`, minHeight: 40, mt: "-1px" }} />
                        )}
                    </Box>

                    {/* Content */}
                    <Box pb={4}>
                        <Typography
                            sx={{
                                fontSize: "0.7rem",
                                color: "primary.main",
                                fontWeight: 700,
                                mb: 0.5,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}
                        >
                            {item.week}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "0.95rem",
                                color: "text.secondary",
                                fontWeight: 700,
                                mb: 0.8,
                            }}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "0.82rem",
                                color: "text.primary",
                                lineHeight: 1.75,
                            }}
                        >
                            {item.detail}
                        </Typography>
                    </Box>
                </Stack>
            ))}
        </Box>
    )
};

export default Timeline;