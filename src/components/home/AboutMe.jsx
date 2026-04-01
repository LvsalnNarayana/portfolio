import { Box, Typography, Container, Divider } from '@mui/material';
import SectionTitle from './SectionTitle';

const AboutMe = () => {
  return (
    <Container component="section" maxWidth="lg" id="about"
      sx={{
        minHeight: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'flex-start',
        py: { xs: 4, md: 4 },
      }}>
      {/* Heading with Left Accent Bar */}
      <SectionTitle title={"About Me"} />

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.2rem',
            lineHeight: 1.7,
            color: 'text.primary',
          }}
        >
          I'm Narayana, a{' '}
          <Box
            component="span"
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            Full Stack Developer
          </Box>{' '}
          with 4+ years of experience designing and building scalable web
          applications across both frontend and backend layers.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: '1.18rem',
            lineHeight: 1.75,
            color: 'text.primary',
          }}
        >
          I specialize in crafting responsive user interfaces and robust
          backend systems using React, Angular, TypeScript, Java, and Spring
          Boot — with a strong focus on performance, scalability, and clean
          architecture.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: '1.18rem',
            lineHeight: 1.75,
            color: 'text.primary',
          }}
        >
          My work includes developing RESTful APIs, integrating microservices,
          and building real-time, data-intensive systems with secure
          authentication and payment integrations.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: '1.18rem',
            lineHeight: 1.75,
            color: 'text.primary',
          }}
        >
          I enjoy solving complex problems and collaborating in Agile teams to
          deliver reliable, high-quality software that enhances user
          experience and system performance.
        </Typography>
      </Box>

      {/* Optional subtle divider */}
      <Divider
        sx={{
          my: 4,
          borderColor: 'divider',
          opacity: 0.6,
        }}
      />

      {/* You can add skills, tech stack, or a short quote here later */}
    </Container>
  );
};

export default AboutMe;