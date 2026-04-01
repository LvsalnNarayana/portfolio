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

const BlogCard = ({
  image,
  title,
  description,
  tags = [],
  link = "#"
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      sx={(theme) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 380,                    // Restricted width
        margin: '0 auto',
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: theme.shadows[1],
        background: theme.palette.mode === 'light' ? '#f8fafc' : '#1e2937',
        transition: 'all 0.3s ease',
        "&:hover": {
          transform: 'translateY(0px)',
          boxShadow: theme.shadows[1],
        },
      })}

    >
      {/* Image / Skeleton */}
      <Box sx={{ position: 'relative', height: 180 }}>
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
          ><Typography color="text.secondary">Image not available</Typography></Skeleton>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
          variant="h5"
          sx={{ fontWeight: 600, mb: 1.5, lineHeight: 1.3 }}
        >
          {title}
        </Typography>

        {/* Description - Max 2 lines */}
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.5,
            mb: 1,
          }}
        >
          {description}
        </Typography>
      </CardContent>

      {/* View Blog Button */}
      <Box sx={{ p: 3, pt: 0, mt: 0 }}>
        <Button
          disableElevation
          disableRipple
          variant="text"
          endIcon={<ArrowForwardIcon />}
          href={link}
          target={link.startsWith('http') ? '_blank' : undefined}
          sx={{
            boxShadow: 0,
            textTransform: 'none',
            fontWeight: 600,
            color: 'primary.main',
            background: 'transparent',
            '&:hover': { background: 'transparent', boxShadow: 0, },
          }}
        >
          View Blog
        </Button>
      </Box>
    </Card>
  );
};

export default BlogCard;