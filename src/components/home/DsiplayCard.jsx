import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Button,
    Skeleton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DisplayCard = ({ data: {
    image,
    title,
    description,
    tags = [],
    link = "#",
    type
} }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <Card
            sx={(theme) => ({
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 380,
                margin: '0 auto',
                borderRadius: 2,
                overflow: 'hidden',
                background: theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.background.paper,
                transition: 'all 0.3s ease',
                boxShadow: theme.shadows[0],
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: theme.palette.divider,
                transform: 'translateY(0px)',
                "&:hover": {
                    transform: 'translateY(0px)',
                    boxShadow: theme.shadows[1],
                },
            })}

        >
            {/* Image / Skeleton */}
            <Box sx={{ position: 'relative', height: 220 }}>
                {!imageLoaded && !imageError && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="wave"
                    />
                )}

                {imageLoaded && !imageError && <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                    }}
                    sx={{
                        height: 220,
                        objectFit: 'cover',
                        display: imageLoaded ? 'block' : 'none',
                    }}
                />}

                {imageError && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="wave"
                    >
                        <Typography color="text.secondary">Image not available</Typography>
                    </Skeleton>
                )}
            </Box>

            <CardContent sx={{ flexGrow: 1, px: 3, py: 2 }}>
                {/* Colorful Tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {tags.slice(0, 3).map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                px: 1,
                                // Different colors for different topics
                                backgroundColor:
                                    tag.includes('React') || tag.includes('Frontend')
                                        ? '#3b82f6'
                                        : tag.includes('Java') || tag.includes('Spring')
                                            ? '#ea580c'
                                            : tag.includes('AI') || tag.includes('Dashboard')
                                                ? '#8b5cf6'
                                                : tag.includes('Stripe') || tag.includes('Payment')
                                                    ? '#10b981'
                                                    : '#64748b',
                                color: '#fff',
                            }}
                        />
                    ))}
                </Box>

                {/* Title */}
                <Typography
                    variant="body1"
                    fontWeight={600}
                    lineHeight={1.3}
                    fontSize={"1.2rem"}
                    sx={{ my: 2 }}
                >
                    {title}
                </Typography>

                {/* Description - Max 2 lines */}
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        fontSize: "0.9rem",
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.5,
                    }}
                >
                    {description}
                </Typography>
            </CardContent>

            {/* View Project Button */}
            <Box sx={{ px: 3, pb: 2, pt: 0, mt: 0 }}>
                <Button
                    disableElevation
                    disableRipple
                    variant="text"
                    endIcon={<ArrowForwardIcon />}
                    href={link}
                    target={link.startsWith('http') ? '_blank' : undefined}
                    sx={{
                        ml: "auto",
                        textTransform: 'none',
                        fontWeight: 600,
                        color: 'primary.main',
                        '&:hover': { background: 'transparent', boxShadow: 0, },
                    }}
                >
                    View {type}
                </Button>
            </Box>
        </Card >
    );
};

export default DisplayCard;