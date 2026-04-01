import {
    Box,
    Container,
    Button
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionTitle from './SectionTitle';
import CardCarousel from './CardCarousel';

const projects = [
    {
        id: 1,
        title: "AI-Powered CRM Dashboard",
        description: "Real-time analytics dashboard with AI insights for Kumbh Mela 2025. Built with React, Redux, and advanced data visualization.",
        image: "/projects/crm-dashboard.jpg",
        tags: ["React", "Redux", "TypeScript", "AI"],
        link: "https://github.com/yourusername/crm-dashboard",
    },
    {
        id: 2,
        title: "Scalable Telecom Microservices",
        description: "High-performance backend system using Java Spring Boot and microservices architecture with secure IBM MQ integration.",
        image: "/projects/telecom-platform.jpg",
        tags: ["Java", "Spring Boot", "Microservices", "Docker"],
        link: "#",
    },
    {
        id: 3,
        title: "Real-time Chat & Visualization Platform",
        description: "Modern chat system with live data visualization and Stripe payment integration.",
        image: "/projects/chat-platform.jpg",
        tags: ["React", "Socket.io", "Stripe", "Recharts"],
        link: "#",
    },
    {
        id: 4,
        title: "E-Commerce Platform with Payment Gateway",
        description: "Full-stack e-commerce solution with secure payment integration and admin dashboard.",
        image: "/projects/ecommerce.jpg",
        tags: ["Next.js", "Stripe", "Tailwind", "Prisma"],
        link: "#",
    },
    {
        id: 5,
        title: "Portfolio Website with Blog System",
        description: "Modern portfolio with CMS-like blog system, dark mode, and smooth animations.",
        image: "/projects/portfolio.jpg",
        tags: ["React", "MUI", "Framer Motion"],
        link: "#",
    },
];

const ProjectsSection = () => {

    return (
        <Container maxWidth="xl" component="section"
            id="projects"
            sx={{
                minHeight: "100vh",
                py: { xs: 4, md: 4 },
            }}>
            {/* Section Heading */}
            <SectionTitle title={"Projects"} />

            {/* Carousel Container */}
            <CardCarousel cardsData={projects} type={"Project"} />

            {/* View All Projects Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    href="/projects"
                    sx={{
                        px: 6,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        textTransform: 'none',
                    }}
                >
                    View All Projects
                </Button>
            </Box>
        </Container>
    );
};

export default ProjectsSection;