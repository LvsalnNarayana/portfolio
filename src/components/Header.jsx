import React, { useState, useEffect, useMemo } from 'react';
import {
    IconButton,
    Box,
    Typography,
    Link as MuiLink,
    Container,
    alpha
} from '@mui/material';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link as RouterLink } from 'react-router-dom';
import { useThemeMode } from '../theme/useThemeMode';

const Header = () => {
    const { mode, toggleTheme } = useThemeMode();
    const [activeSection, setActiveSection] = useState('');

    const navLinks = useMemo(() => {
        return [
            { label: 'About', href: '#about' },
            { label: 'Experience', href: '#experience' },
            { label: 'Projects', href: '#projects' },
            { label: 'Blogs', href: '#blogs' },
            { label: 'Contact', href: '#contact' },
        ]
    }, []);

    // Smooth scroll + set active
    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            const headerOffset = 90;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });

            setActiveSection(targetId);
        }
    };

    // Improved scroll observer for active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -45% 0px',   // Better feel for fixed header
                threshold: [0.2, 0.5, 0.8],           // Multiple thresholds for smoother transition
            }
        );

        navLinks.forEach((link) => {
            const id = link.href.replace('#', '');
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        // Fallback: set first section as active when at top
        const handleScrollTop = () => {
            if (window.scrollY < 200) {
                setActiveSection('');
            }
        };

        window.addEventListener('scroll', handleScrollTop);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScrollTop);
        };
    }, [navLinks]);

    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                top: '20px',
                zIndex: 1100,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                px: 2.5,
            }}
        >
            <Container
                maxWidth="xl"
                sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.75,
                    px: 3.5,
                    borderRadius: '20px',

                    // Dynamic Glassmorphism using theme
                    backgroundColor: theme.palette.mode === 'light'
                        ? alpha(theme.palette.background.paper, 0.55)
                        : alpha(theme.palette.background.paper, 0.55),

                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(16px)',

                    // Dynamic shadow
                    boxShadow: theme.palette.mode === 'light'
                        ? '0 5px 40px -5px rgba(0, 0, 0, 0.12)'
                        : '0 5px 40px -5px rgba(0, 0, 0, 0.45)',

                    transition: 'background-color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
                })}
            >
                {/* Logo */}
                <RouterLink to="/" style={{ textDecoration: 'none' }}>
                    <Typography
                        variant="h3"
                        sx={(theme) => ({
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.88 },
                        })}
                    >
                        N.Dev
                    </Typography>
                </RouterLink>

                {/* Navigation */}
                <Box sx={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    {navLinks.map((item) => {
                        const sectionId = item.href.replace('#', '');
                        const isActive = activeSection === sectionId;

                        return (
                            <MuiLink
                                key={item.label}
                                href={item.href}
                                underline="none"
                                onClick={(e) => handleNavClick(e, item.href)}
                                sx={(theme) => ({
                                    color: isActive
                                        ? theme.palette.primary.main
                                        : theme.palette.text.primary,
                                    fontWeight: isActive ? 700 : 500,
                                    fontSize: '0.95rem',
                                    position: 'relative',
                                    transition: 'color 0.2s ease',

                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                    },

                                    ...(isActive && {
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-6px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '28px',
                                            height: '2.5px',
                                            backgroundColor: theme.palette.primary.main,
                                            borderRadius: '3px',
                                        },
                                    }),
                                })}
                            >
                                {item.label}
                            </MuiLink>
                        );
                    })}
                </Box>

                {/* Theme Toggle */}
                <IconButton
                    disableRipple
                    onClick={toggleTheme}
                    aria-label="toggle theme"
                    sx={(theme) => ({
                        width: 42,
                        height: 42,
                        borderRadius: '12px',
                        backgroundColor: theme.palette.mode === 'light'
                            ? alpha(theme.palette.grey[200], 0.9)
                            : alpha(theme.palette.grey[800], 0.9),

                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'light'
                                ? theme.palette.grey[300]
                                : theme.palette.grey[700],
                        },

                        transition: 'background-color 0.2s ease',
                    })}
                >
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Container>
        </Box>
    );
};

export default Header;