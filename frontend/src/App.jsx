import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./components/Section/About";
import Resume from "./components/Section/Resume";
import Portfolio from "./components/Section/Portfolio";
import Blog from "./components/Section/Blog";
import Contact from "./components/Section/Contact";
import NotFound from "./components/common/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<div>Admin Panel Coming Soon...</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
