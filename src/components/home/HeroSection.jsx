import { Box, Typography, Button, IconButton, useTheme, Container } from '@mui/material';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GradientText from './GradientText';

const HeroSection = () => {
  const theme = useTheme();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  // Smooth scroll handler + set active on click
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
    }
  };
  return (

    <Container
      component="section"
      maxWidth="xl"
      sx={{
        minHeight: '100vh',
        margin: '0 auto',
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '40% 60%' },
          gap: { xs: 6, md: 8 },
          alignItems: 'flex-start',
          paddingTop: '25vh',
          minHeight: '100vh',
        }}
      >
        {/* Lottie Animation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: { xs: '320px', md: '480px' },
          }}
        >
          <DotLottieReact
            src="src/assets/Developer_Yoga.lottie"   // or "/assets/Developer_Yoga.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%', maxWidth: '420px' }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ spaceY: 4 }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '2px',
              color: 'secondary.main',
              mb: 2,
            }}
          >
            Hello World 👋
          </Typography>

          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              gap: '15px',
              fontSize: { xs: '3.2rem', md: '4.5rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            I’m{' '}
            {/* <Box
                component="span"
                sx={(theme) => ({
                  background: `linear-gradient(
      270deg,
      ${theme.palette.primary.main},
      ${theme.palette.primary.light},
      ${theme.palette.primary.dark}
    )`,
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  animation: `${gradientAnimation} 6s ease infinite`,
                })}
              >
                Narayana
              </Box> */}
            <GradientText
              colors={[theme.palette.primary.main, theme.palette.secondary.main, theme.palette.primary.light]}
              animationSpeed={8}
              showBorder={false}
              className="custom-class"
              style={{
                margin: 0,
                fontSize: "4.5rem",
                fontWeight: 800
              }}
            >
              Narayana
            </GradientText>

          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.5rem' },
              fontWeight: 500,
              color: 'text.secondary',
              mb: 3,
            }}
          >
            Full-stack engineer · Backend specialist · System designer
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: 'text.secondary',
              maxWidth: '580px',
              mb: 5,
            }}
          >
            I turn complex ideas into scalable, high-performance systems that feel effortless to use.
          </Typography>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollTo('contact')}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 1,
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
              }}
            >
              Get in touch
            </Button>

            <Box sx={{ display: 'flex', gap: 4 }}>
              <IconButton
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                }}
                size="large"
              >
                <GitHubIcon sx={{ fontSize: 32 }} />
              </IconButton>

              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                }}
                size="large"
              >
                <LinkedInIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Scroll Down Indicator */}
      <Box
        onClick={(e) => handleNavClick(e, 'about')}
        sx={{
          position: 'absolute',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(-50%) scale(1.1)',
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            letterSpacing: '2px',

            animation: 'bounce 1.8s infinite',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Scroll ↓
        </Typography>

      </Box>
    </Container>


  );
};

export default HeroSection;