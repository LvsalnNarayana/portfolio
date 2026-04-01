import { Box, Container, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionTitle from './SectionTitle';
import CardCarousel from './CardCarousel';

const blogs = [
    {
        id: 1,
        title: "AI-Powered CRM Dashboard",
        description: "Real-time analytics dashboard with AI insights for Kumbh Mela 2025. Built with React, Redux, and advanced data visualization.",
        image: "/blogs/crm-dashboard.jpg",
        tags: ["React", "Redux", "TypeScript", "AI"],
        link: "https://github.com/yourusername/crm-dashboard",
    },
    {
        id: 2,
        title: "Scalable Telecom Microservices",
        description: "High-performance backend system using Java Spring Boot and microservices architecture with secure IBM MQ integration.",
        image: "/blogs/telecom-platform.jpg",
        tags: ["Java", "Spring Boot", "Microservices", "Docker"],
        link: "#",
    },
    {
        id: 3,
        title: "Real-time Chat & Visualization Platform",
        description: "Modern chat system with live data visualization and Stripe payment integration for business intelligence tool.",
        image: "/blogs/chat-platform.jpg",
        tags: ["React", "Socket.io", "Stripe", "Recharts"],
        link: "#",
    },
    {
        id: 4,
        title: "E-Commerce Platform with Payment Gateway",
        description: "Full-stack e-commerce solution with secure payment integration, user authentication, and admin dashboard.",
        image: "/blogs/ecommerce.jpg",
        tags: ["Next.js", "Stripe", "Tailwind", "Prisma"],
        link: "#",
    },
    {
        id: 5,
        title: "Portfolio Website with Blog System",
        description: "Modern portfolio with CMS-like blog system, dark mode, and smooth animations built using React & MUI.",
        image: "/blogs/portfolio.jpg",
        tags: ["React", "MUI", "Framer Motion"],
        link: "#",
    },
];

const BlogsSection = () => {

    return (
        <Container maxWidth="xl" component="section"
            id="blogs"
            sx={{
                minHeight: "100vh",
                py: { xs: 4, md: 4 },
            }}>
            {/* Heading */}
            <SectionTitle title={"Blogs"} />

            {/* Embla Carousel with Proper Gap */}
            <CardCarousel cardsData={blogs} type={"Blog"} />

            {/* See More Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    href="/blogs"
                    sx={{
                        px: 5,
                        py: 1,
                        borderRadius: 1,
                        fontSize: '1rem',
                        fontWeight: 500,
                        textTransform: 'none',
                    }}
                >
                    View All Blogs
                </Button>
            </Box>
        </Container>
    );
};

export default BlogsSection;