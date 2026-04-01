import {
    Typography,
    Grid,
    Paper,
} from "@mui/material";


const MetricCards = ({ data: metricCardsData }) => (
    <Grid container spacing={2} mt={1}>
        {metricCardsData.map((m, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Paper
                    elevation={0}
                    sx={{
                        border: `2px solid ${m.color}33`,
                        borderRadius: 2,
                        p: 3,
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            background: m.color,
                        },
                    }}
                >
                    <Typography sx={{ fontSize: "1.6rem", mb: 1 }}>{m.icon}</Typography>
                    <Typography
                        sx={{
                            fontSize: "2rem",
                            fontWeight: 800,
                            color: m.color,
                            lineHeight: 1,
                            mb: 0.5,
                        }}
                    >
                        {m.value}
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 0.5, }}>
                        {m.label}
                    </Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", }}>
                        {m.sub}
                    </Typography>
                </Paper>
            </Grid>
        ))}
    </Grid>
);
export default MetricCards;