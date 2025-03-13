import "./App.css";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import About from "./pages/About.tsx";
import ItemPreview from "./pages/ItemPreview.tsx";
import { Lenis } from "@studio-freight/react-lenis";
import { MdExpandMore } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Lenis root>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Lenis>
    </Router>
  );
}

export default App;
