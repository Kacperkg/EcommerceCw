import "./App.css";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import { Lenis } from "@studio-freight/react-lenis";

function App() {
  return (
      <Lenis root>
        <Home />
      </Lenis>

  );
}

export default App;
