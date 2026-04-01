import {
    Box,
    Typography,
    Paper,
    List,
    ListItemButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles"
import MenuBookIcon from "@mui/icons-material/MenuBook";
/* ============================================================
   SIDEBAR
============================================================ */

const BlogSidebar = ({ activeSection, onNavigate, blogData }) => (
    <Box sx={{
        pb: 10,
        position: { xs: "relative", md: "sticky" }, // ✅ responsive
        top: { md: 120 },
        maxHeight: { md: "calc(100vh - 100px)" }, // ✅ safe height
        overflowY: "auto",
        pr: 1,
        minWidth: 0, // ✅ IMPORTANT fix
    }}>
        <Paper
            elevation={0}
            sx={{
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    px: 2.5,
                    py: 2,
                    borderBottom: "1px solid rgba(99,102,241,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <MenuBookIcon sx={{ fontSize: 16, color: "primary.dark" }} />
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "primary.dark",
                        textTransform: "uppercase",
                    }}
                >
                    Contents
                </Typography>
            </Box>

            <List dense sx={{ py: 1, px: 2 }}>
                {blogData.sections.map((section, i) => {
                    const isActive = activeSection === section.id;
                    return (
                        <ListItemButton
                            key={section.id}
                            onClick={() => onNavigate(section.id)}
                            sx={{
                                px: 2.5,
                                py: 0.8,
                                borderLeft: (t) =>
                                    isActive
                                        ? `2px solid ${t.palette.primary.light}`
                                        : "2px solid transparent",
                                bgcolor: (t) =>
                                    isActive ? alpha(t.palette.primary.main, 0.08) : "transparent",
                                "&:hover": {
                                    bgcolor: (t) => alpha(t.palette.primary.main, 0.05),
                                },
                                transition: "all 0.2s ease",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    color: isActive ? "primary.light" : "text.primary",
                                    fontWeight: isActive ? 600 : 400,
                                    transition: "color 0.2s ease",
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        color: isActive ? "primary.light" : "text.disabled",
                                        mr: 1.5,
                                    }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </Box>
                                {section.title}
                            </Typography>
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>

    </Box>
);

export default BlogSidebar;