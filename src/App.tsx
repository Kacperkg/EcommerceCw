import "./App.css";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import ItemPreview from "./pages/ItemPreview.tsx";
import { Lenis } from "@studio-freight/react-lenis";
import { MdExpandMore } from "react-icons/md";

function App() {
  return (
      <Lenis root>
        <Explore />
      </Lenis>

  );
}

export default App;
