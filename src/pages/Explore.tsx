import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { getAllProducts } from "../firebase/fetches";
import { Product } from "../types/DatabaseTypes";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import bench from "../assets/Explore/bench.avif";
import whitedesk from "../assets/Explore/whitedesk.avif";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: whitedesk,
    title: "Explore Styles",
    subtitle: "Curated For Your Home",
  },
  {
    image: bench,
    title: "Browse Collection",
    subtitle: "Find Your Perfect Piece",
  },
];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="z-[99] pt-[32px]">
        <Navbar />
        <div className="max-w-[1440px] m-auto">
          <section>
            <Banner onShopNowClick={scrollToProducts} />
            <SortingSection
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            <div ref={productsRef}>
              <Products selectedCategory={selectedCategory} />
            </div>
          </section>
        </div>
      </div>
      <div className="mt-auto">
        <div className="max-w-[1440px] m-auto mt-[64px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}

const Banner = ({ onShopNowClick }: { onShopNowClick: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[30vh] w-full overflow-hidden border-r border-l border-b">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            slides[(index + 1) % slides.length]?.image || slides[0].image
          })`,
        }}
      />

      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 overflow-hidden"
          initial={{ y: "0%" }}
          animate={{ y: "100%" }}
          exit={{ y: "100%" }}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 4 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].image})` }}
          />
          <div className="absolute left-[32px] bottom-[32px] text-white p-4 rounded-lg text-left gap-[16px] flex flex-col">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl"
            >
              {slides[index].subtitle}
            </motion.h3>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-7xl pb-[16px] drop-shadow-lg"
            >
              {slides[index].title}
            </motion.h1>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={onShopNowClick}
              className="px-6 py-3 text-white border border-white text-lg w-fit hover:bg-black/20 hover:backdrop-blur-sm transition-all duration-300"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SortingSection = ({
  onCategorySelect,
  selectedCategory,
}: {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
}) => {
  const categories = ["Sofa", "Bench", "Chair", "Table"];

  return (
    <div className="flex justify-between items-center mt-[128px] px-[32px]">
      <h2 className="text-2xl font-medium">Crafted with excellent material</h2>
      <div className="flex gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              onCategorySelect(selectedCategory === category ? null : category)
            }
            className={`px-4 py-2 border border-black ${
              selectedCategory === category ? "bg-black text-[#f6f1eb]" : "bg"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

const FilterSection = ({
  onPriceChange,
  onColourChange,
  selectedPrice,
  selectedColour,
}: {
  onPriceChange: (range: string) => void;
  onColourChange: (colour: string) => void;
  selectedPrice: string;
  selectedColour: string;
}) => {
  const priceRanges = [
    "All Prices",
    "Under £100",
    "£100 - £300",
    "£300 - £600",
    "Above £600",
  ];

  const colours = ["All Colours", "Black", "White", "Brown", "Beige", "Blue"];

  return (
    <div className="w-[250px] pr-8">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        {priceRanges.map((range) => (
          <button
            key={range}
            onClick={() => onPriceChange(range)}
            className={`block mb-2 ${
              selectedPrice === range ? "font-bold" : ""
            }`}
          >
            {range}
          </button>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Colour</h3>
        {colours.map((colour) => (
          <button
            key={colour}
            onClick={() => onColourChange(colour)}
            className={`block mb-2 ${
              selectedColour === colour ? "font-bold" : ""
            }`}
          >
            {colour}
          </button>
        ))}
      </div>
    </div>
  );
};

const Products = ({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [selectedColour, setSelectedColour] = useState("All Colours");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        console.log("Fetched products:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      console.log("Product filters:", product.filters);

      const matchesCategory =
        !selectedCategory || product.categories?.includes(selectedCategory);
      const matchesColour =
        selectedColour === "All Colours" ||
        product.colour?.some(
          (c) => c.toLowerCase() === selectedColour.toLowerCase()
        );

      let matchesPrice = true;
      if (selectedPrice !== "All Prices") {
        const cost = product.cost;
        switch (selectedPrice) {
          case "Under £100":
            matchesPrice = cost < 100;
            break;
          case "£100 - £300":
            matchesPrice = cost >= 100 && cost <= 300;
            break;
          case "£300 - £600":
            matchesPrice = cost > 300 && cost <= 600;
            break;
          case "Above £600":
            matchesPrice = cost > 600;
            break;
        }
      }

      return matchesCategory && matchesColour && matchesPrice;
    });
  };

  const filteredProducts = filterProducts(products);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex gap-8 mt-[64px] px-[32px] relative">
      <div className="relative">
        <FilterSection
          onPriceChange={setSelectedPrice}
          onColourChange={setSelectedColour}
          selectedPrice={selectedPrice}
          selectedColour={selectedColour}
        />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-[#000000]" />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                onClick={() =>
                  navigate(`/item-preview`, { state: { product } })
                }
              />
            ))
          ) : (
            <p className="col-span-full text-center text-lg">
              No products found with selected filters
            </p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-[32px]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border ${
                    currentPage === number
                      ? "bg-black text-[#f6f1eb]"
                      : "border-black"
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const productInCart = cartItems.some(
      (item: { productId: string }) => item.productId === product.productId
    );
    setIsInCart(productInCart);
  }, [product.productId]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex: number = cartItems.findIndex(
      (item: { productId: string }) => item.productId === product.productId
    );

    if (existingItemIndex >= 0) {

      cartItems.splice(existingItemIndex, 1);
      setIsInCart(false);
    } else {

      cartItems.push({
        ...product,
        quantity: 1,
      });
      setIsInCart(true);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (
    <div
      className="relative group max-w-[220px] w-full mx-auto"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration:300"
        />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
      >
        {isLiked ? (
          <AiFillHeart className="text-red-500" />
        ) : (
          <AiOutlineHeart />
        )}
      </button>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="font-semibold">£{product.cost}</span>
          <button 
            className={`p-2 rounded-full transition-colors ${
              isInCart ? 'bg-black text-white' : 'hover:bg-gray-100'
            }`}
            onClick={handleAddToCart}
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
