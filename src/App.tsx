import "./App.css";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default App;
