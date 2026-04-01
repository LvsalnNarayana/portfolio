import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    useTheme
} from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DisplayCard from './DsiplayCard';


const CardCarousel = ({ cardsData, type }) => {
    const theme = useTheme();

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 640px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 },
        },
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Update selected index and button states
    const onSelect = useCallback(() => {
        if (!emblaApi) return;

        const currentIndex = emblaApi.selectedScrollSnap();
        setSelectedIndex(currentIndex);

        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    // Embla event listeners
    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        // Safe initial call (prevents "setState in effect" warning)
        queueMicrotask(() => onSelect());

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (

        <Box sx={{ position: 'relative', maxWidth: '1280px', mx: 'auto' }}>
            <Box sx={{ overflow: 'hidden' }}>
                <Box ref={emblaRef} sx={{
                    py: 2,
                    overflow: 'hidden',
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            ml: -2,
                        }}
                    >
                        {cardsData.map((data) => (
                            <Box
                                key={data.id}
                                sx={{
                                    flex: '0 0 100%',
                                    minWidth: 0,
                                    '@media (min-width: 640px)': { flex: '0 0 50%' },
                                    '@media (min-width: 1024px)': { flex: '0 0 33.333%' },
                                }}
                            >
                                <DisplayCard
                                    data={{ ...data, type }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Navigation Buttons */}
            <IconButton
                disableRipple
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                sx={{
                    color: "white",
                    position: 'absolute',
                    left: { xs: -16, lg: -40 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.palette.mode === 'dark' ? 8 : 4,
                    width: 52,
                    height: 52,
                    zIndex: 30,
                    display: { xs: 'none', lg: 'flex' },
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                    },
                    '&:disabled': {
                        opacity: 0.4,
                        cursor: 'not-allowed',
                    },
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
                disableRipple
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                sx={{
                    color: "white",
                    position: 'absolute',
                    right: { xs: -16, lg: -40 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.palette.mode === 'dark' ? 8 : 4,
                    width: 52,
                    height: 52,
                    zIndex: 30,
                    display: { xs: 'none', lg: 'flex' },
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                    },
                    '&:disabled': {
                        opacity: 0.4,
                        cursor: 'not-allowed',
                    },
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

export default CardCarousel