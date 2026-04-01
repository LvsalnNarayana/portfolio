import {
    Box,
    Typography,
    useTheme,
    alpha,
} from "@mui/material";

const ArchitectureDiagram = () => {
    const theme = useTheme();

    return (
        <Box
            mt={2}
            sx={{
                border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                borderRadius: 1,
                p: 2,
            }}
        >
            <Typography
                sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                    mb: 2,
                    letterSpacing: "0.1em",
                }}
            >
                System Architecture — E-Commerce Microservices
            </Typography>
            <img src="/src/assets/new_dig.svg" style={{ maxWidth: "100%" }} />

        </Box>
    );
};

export default ArchitectureDiagram;