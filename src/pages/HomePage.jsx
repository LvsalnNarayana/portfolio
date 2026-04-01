import HeroSection from '../components/home/HeroSection'
import AboutMe from '../components/home/AboutMe'
import Experience from '../components/home/Experience'
import ProjectsSection from '../components/home/ProjectsSection'
import BlogsSection from '../components/home/BlogsSection'
import ContactForm from '../components/home/ContactForm'


const HomePage = () => {
    return (
        <>
            <HeroSection />
            <AboutMe />
            <Experience />
            <ProjectsSection />
            <BlogsSection />
            <ContactForm />
        </>
    )
}

export default HomePage