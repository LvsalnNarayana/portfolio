import {
    Box,
    Typography,
    Stack,
} from "@mui/material";
/* ============================================================
   SECTION HEADER
============================================================ */

const BlogSectionHeader = ({ title, id }) => (
    <Box mb={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
            <Box
                sx={{
                    width: 3,
                    height: 28,
                    background: "linear-gradient(to bottom, #6366F1, #8B5CF6)",
                    borderRadius: 4,
                    flexShrink: 0,
                }}
            />
            <Typography
                id={id}
                variant="h5"
                fontWeight={700}
                sx={{
                    fontSize: "1.5rem",
                    color: "text.primary",
                    letterSpacing: "-0.01em",
                }}
            >
                {title}
            </Typography>
        </Stack>
        <Box
            sx={{
                height: "1px",
                background: "linear-gradient(to right, rgba(99,102,241,0.3), transparent)",
                mt: 2,
            }}
        />
    </Box>
);

export default BlogSectionHeader;