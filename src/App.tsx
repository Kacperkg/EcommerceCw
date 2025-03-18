import "./App.css";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import About from "./pages/About.tsx";
import ItemPreview from "./pages/ItemPreview.tsx";
import Cart from "./pages/Cart.tsx";
<<<<<<< HEAD
import Account from "./pages/Account.tsx";
=======
import Checkout from "./pages/Checkout.tsx";
>>>>>>> c877a14 (add Checkout page and integrate with Cart for order processing)
import { Lenis } from "@studio-freight/react-lenis";
import { MdExpandMore } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm.tsx";
import SignUpForm from "./components/SignUpForm.tsx";

function App() {
  return (
    <Router>
      <Lenis root>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/item-preview" element={<ItemPreview />} />
          <Route path="/cart" element={<Cart />} />
<<<<<<< HEAD
          <Route path="/account" element={<Account />} />
=======
          <Route path="/checkout" element={<Checkout />} />
>>>>>>> c877a14 (add Checkout page and integrate with Cart for order processing)
        </Routes>
      </Lenis>
    </Router>
  );
}

export default App;
