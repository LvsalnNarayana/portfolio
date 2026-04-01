import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ProjectPage from "./pages/ProjectPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/blog" element={<><BlogPage /><Footer /></>} />
        <Route path="/project" element={<><ProjectPage /><Footer /></>} />
      </Route>
    </Routes>
  );
};

export default App;