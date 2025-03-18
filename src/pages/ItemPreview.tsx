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

        // Skip if there aren't enough products for meaningful recommendations
        if (productsData.length < 5) {
          setRelatedProducts(
            productsData
              .filter((p) => p.productId !== product.productId)
              .slice(0, 4)
          );
          return;
        }

        // Create a features matrix based on product attributes
        const productIds = productsData.map((p) => p.productId);
        const productsMap = Object.fromEntries(
          productsData.map((p) => [p.productId, p])
        );

        // Create matrix with features (room compatibility, rating similarity, color match)
        const matrix: number[][] = [];

        // For each product pair, calculate similarity score
        for (let i = 0; i < productIds.length; i++) {
          matrix[i] = [];
          const product1 = productsMap[productIds[i]];

          for (let j = 0; j < productIds.length; j++) {
            if (i === j) {
              matrix[i][j] = 1; // Product is perfectly similar to itself
              continue;
            }

            const product2 = productsMap[productIds[j]];
            let similarity = 0;

            // Room similarity (0.5 weight)
            if (product1.room && product2.room) {
              const commonRooms = product1.room.filter((r) =>
                product2.room.some((r2) => r2.toLowerCase() === r.toLowerCase())
              ).length;
              const totalRooms = new Set([...product1.room, ...product2.room])
                .size;
              similarity += 0.5 * (commonRooms / Math.max(1, totalRooms));
            }

            // Rating similarity (0.3 weight)
            if (
              product1.rating !== undefined &&
              product2.rating !== undefined
            ) {
              const ratingDiff =
                1 - Math.abs(product1.rating - product2.rating) / 5;
              similarity += 0.3 * ratingDiff;
            }

            // Color similarity (0.2 weight)
            if (product1.color && product2.color) {
              if (
                product1.color.toLowerCase() === product2.color.toLowerCase()
              ) {
                similarity += 0.2;
              }
            }

            matrix[i][j] = similarity;
          }
        }

        // Apply matrix factorization
        const { P, Q } = matrixFactorization(matrix, 2, 100, 0.01, 0.01);

        // Get the index of the current product
        const productIndex = productIds.findIndex(
          (id) => id === product.productId
        );
        if (productIndex === -1) {
          setRelatedProducts([]);
          return;
        }

        // Calculate similarity scores with the current product for all products
        const currentProductFeatures = P[productIndex];
        const similarities = productIds.map((id, index) => {
          // Skip comparing with itself
          if (id === product.productId) return { id, score: -1 };

          // Calculate cosine similarity between product vectors
          const dotProduct = Q[index].reduce(
            (sum, val, i) => sum + val * currentProductFeatures[i],
            0
          );
          const magnitude1 = Math.sqrt(
            currentProductFeatures.reduce((sum, val) => sum + val * val, 0)
          );
          const magnitude2 = Math.sqrt(
            Q[index].reduce((sum, val) => sum + val * val, 0)
          );
          const similarity =
            magnitude1 && magnitude2
              ? dotProduct / (magnitude1 * magnitude2)
              : 0;

          return { id, score: similarity };
        });

        // Sort by similarity and get top 4 products
        const topProductIds = similarities
          .filter((item) => item.score >= 0) // Remove the current product
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
          .map((item) => item.id);

        const recommendedProducts = topProductIds.map((id) => productsMap[id]);
        setRelatedProducts(recommendedProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
        // Fallback to showing random products
        const filteredProducts = product
          ? (await getAllProducts())
              .filter((p) => p.productId !== product.productId)
              .slice(0, 4)
          : [];
        setRelatedProducts(filteredProducts);
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
