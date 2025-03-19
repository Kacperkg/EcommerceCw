import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import ItemPreview from "./pages/ItemPreview";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/about", element: <About /> },
      { path: "/item-preview", element: <ItemPreview /> },
      { path: "/cart", element: <Cart /> },
      { path: "/account", element: <Account /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "*", element: <div>Not Found</div> },
    ],
    {
      basename: "/EcommerceCw", // Match the base path from vite.config.ts
    }
  );

  // If you're seeing navigation issues, make sure to check how links to Account are implemented
  // in your navigation components or wherever links to Account are created
  return <RouterProvider router={router} />;
}

export default App;
