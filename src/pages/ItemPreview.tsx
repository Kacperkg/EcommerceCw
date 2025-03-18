import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainButton } from "../components/MainButton";
import { useLocation, useNavigate } from "react-router-dom"; // Add useNavigate import
import { useEffect, useState } from "react";
import { getAllProducts } from "../firebase/fetches";
import { Product } from "../types/DatabaseTypes";
import { matrixFactorization } from "../utils/matrixFactorization";

export default function ItemPreview() {
  return (
    <>
      <div className="mt-[32px]">
        <Navbar />
      </div>
      <Body />
      <Footer />
    </>
  );
}

const Body = () => {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <>
      <section className="flex justify-between items-center max-w-[1440px] m-auto mt-[64px]">
        <ProductImages images={product?.images || []} />
        <ProductInfo product={product} />
      </section>
      <MightLike />
    </>
  );
};

const ProductImages = ({ images }: { images: string[] }) => {
  return (
    <div className="max-w-[654px] flex-1">
      <div className="aspect-square flex-1 bg-(--secondary)">
        {images[0] && (
          <img
            src={images[0]}
            alt="Product"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex mt-[8px] justify-between">
        {images.slice(1).map((image, index) => (
          <div
            key={index}
            className="aspect-square flex-1 max-w-[120px] bg-blue-500"
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductInfo = ({ product }: { product: any }) => {
  if (!product) return null;

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (
    <aside className="text-left max-w-[548px] flex-1">
      <div className="gap-[16px] flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl">{product.name}</h1>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={star <= (product.rating || 0) ? "#FFD700" : "none"}
              stroke="#FFD700"
              strokeWidth="2"
            >
              <path d="M12 2l2.4 7.4h7.6l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.4h7.6z" />
            </svg>
          ))}
          <span className="ml-2 text-gray-600">({product.rating || 0}/5)</span>
        </div>
      </div>
      <h1 className="mt-[32px] text-4xl">£ {product.cost}</h1>
      <p className="mt-[32px] text-lg">{product.description}</p>
      <p className="mt-[16px] text-lg">Room: {product.room.join(", ")}</p>
      <div className="mt-[64px]">
        <MainButton name="ADD TO CART" onClick={handleAddToCart} />
      </div>
    </aside>
  );
};

const MightLike = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const productsData = await getAllProducts();

        // Calculate relevance score for each product with prioritization:
        // 1. Room (highest priority)
        // 2. Rating (medium priority)
        // 3. Color (lowest priority)
        const productsWithScores = productsData
          .filter((p) => p.productId !== product.productId) // Exclude current product
          .map((p) => {
            let score = 0;

            // Room similarity (highest priority - up to 50 points)
            const commonRooms =
              p.room?.filter((r) => product.room.includes(r.toLowerCase()))
                .length || 0;
            score += commonRooms * 50;

            // Rating similarity (medium priority - up to 20 points)
            const ratingDiff = Math.abs(
              (p.rating || 0) - (product.rating || 0)
            );
            score += (5 - ratingDiff) * 4; // Max 20 points

            // Color similarity (lowest priority - up to 10 points)
            if (p.color && product.color) {
              if (p.color.toLowerCase() === product.color.toLowerCase()) {
                score += 10;
              }
            }

            return { ...p, relevanceScore: score };
          });

        // Sort by relevance score and take top 4
        const filteredProducts = productsWithScores
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, 4);

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  return (
    <div className="flex flex-col uppercase text-left max-w-[1440px] m-auto mt-[80px]">
      <h2 className="text-3xl">You might also like</h2>
      <div className="flex mt-[16px] justify-between">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.productId}
              className="flex-1 max-w-[225px] aspect-square cursor-pointer overflow-hidden"
              onClick={() =>
                navigate(`/item-preview`, {
                  state: { product: relatedProduct },
                })
              }
            >
              <img
                src={relatedProduct.images[0]}
                alt={relatedProduct.name}
                className="w-full h-full object-cover transform scale-110 hover:scale-100 transition-transform duration-300"
              />
            </div>
          ))
        ) : (
          <p>No related products found</p>
        )}
      </div>
    </div>
  );
};
