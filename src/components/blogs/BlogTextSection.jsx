import React from "react";
import {
    Box,
    Typography,
} from "@mui/material";
/* ============================================================
   TEXT SECTION
============================================================ */

const BlogTextSection = ({ content }) => {
    const paragraphs = content.split("\n\n");
    return (
        <Box>
            {paragraphs.map((p, i) => (
                <Typography
                    key={i}
                    sx={{
                        lineHeight: 1.85,
                        fontSize: "1.1rem",
                        mb: 2.5,
                    }}
                    component="p"
                >
                    {p.split("\n").map((line, li) => (
                        <React.Fragment key={li}>
                            {line.startsWith("•") ? (
                                <Box
                                    component="span"
                                    sx={{ display: "block", pl: 2, position: "relative", "&::before": { content: "'›'", position: "absolute", left: 0, color: "#6366F1" } }}
                                >
                                    {line.substring(1).trim()}
                                </Box>
                            ) : (
                                line
                            )}
                            {li < p.split("\n").length - 1 && line.startsWith("•") && <br />}
                        </React.Fragment>
                    ))}
                </Typography>
            ))}
        </Box>
    );
};

export default BlogTextSection;