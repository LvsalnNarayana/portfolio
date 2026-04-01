import {
    Box,
    Typography,
    useTheme
} from '@mui/material';

const SectionTitle = ({ title }) => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 6 }}>
            <Box
                sx={{
                    width: '6px',
                    height: '48px',
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main},  ${theme.palette.secondary.main})`,
                    borderRadius: '9999px',
                }}
            />
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    lineHeight: 1.1,
                }}
            >
                {title}
            </Typography>
        </Box>
    )
}

export default SectionTitle