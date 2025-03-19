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

const ProductInfo = ({ product }: { product: Product | null }) => {
  if (!product) return null;

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cartItems.findIndex(
      (item: Product) => item.productId === product.productId
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
      <p className="mt-[16px] text-lg">
        Room: {(product.room ?? []).join(", ")}
      </p>
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
        if (!product || !product.productId) {
          console.error("Product information is missing");
          return;
        }

        const productsData = await getAllProducts();
        console.log(`Fetched ${productsData.length} products total`);

        // Filter out current product and ensure we have at least 4 products left
        const otherProducts = productsData.filter(
          (p) => p.productId !== product.productId
        );

        // If we don't have enough products for recommendations, just show what we have
        if (otherProducts.length < 4) {
          console.log(
            "Not enough products for meaningful recommendations, showing available products"
          );
          setRelatedProducts(
            otherProducts
              .map((p) => ({ ...p, rating: p.rating ?? 0 }))
              .slice(0, 4)
          );
          return;
        }

        // Create a features matrix based on product attributes
        const allProducts = [product, ...otherProducts];
        const productIds = allProducts.map((p) => p.productId);
        const productsMap = Object.fromEntries(
          allProducts.map((p) => [p.productId, p])
        );

        console.log(
          `Creating similarity matrix for ${productIds.length} products`
        );

        // Create matrix with features (room compatibility, rating similarity, colour match)
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
            if (product1.room?.length && product2.room?.length) {
              const commonRooms = product1.room.filter((r: string) =>
                product2.room.some(
                  (r2: string) => r2.toLowerCase() === r.toLowerCase()
                )
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

            // Colour similarity (0.2 weight)
            if (product1.colour && product2.colour) {
              if (
                (product1.colour as string[]).some((c1: string) =>
                  (product2.colour as string[]).some(
                    (c2: string) => c1.toLowerCase() === c2.toLowerCase()
                  )
                )
              ) {
                similarity += 0.2;
              }
            }

            matrix[i][j] = similarity;
          }
        }

        // Apply matrix factorization
        try {
          console.log("Applying matrix factorization");
          const result = matrixFactorization(matrix, 2, 100, 0.01, 0.01);

          // Map the current product ID to its index in the productIds array
          const currentProductIndex = productIds.findIndex(
            (id) => id === product.productId
          );
          if (currentProductIndex === -1) {
            throw new Error("Current product not found in product IDs array");
          }

          // Get similar products based on the index
          const similarIndices: number[] = result
            .getSimilarProducts(product.productId, 4)
            .map((index) => parseInt(index, 10));
          console.log("Similar indices:", similarIndices);

          // Map indices back to product IDs
          const topProductIds = similarIndices.map(
            (index) => productIds[index]
          );
          console.log("Top product IDs:", topProductIds);

          // Map the top product IDs to their corresponding product objects
          const recommendedProducts = topProductIds
            .map((id) => productsMap[id])
            .filter(Boolean); // Filter out any undefined values

          console.log(
            `Found ${recommendedProducts.length} recommended products`
          );

          if (recommendedProducts.length > 0) {
            setRelatedProducts(recommendedProducts);
          } else {
            throw new Error("No valid recommended products found");
          }
        } catch (matrixError) {
          console.error("Error in matrix factorization:", matrixError);
          throw matrixError; // Re-throw to trigger fallback
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
        // Fallback to showing products with similar rooms
        const fallbackProducts = (await getAllProducts())
          .filter((p) => p.productId !== product.productId)
          .sort((a, b) => {
            // Prioritize products with matching rooms
            const aRoomMatch = a.room?.some((r: string) =>
              product.room?.includes(r)
            )
              ? 1
              : 0;
            const bRoomMatch = b.room?.some((r: string) =>
              product.room?.includes(r)
            )
              ? 1
              : 0;
            return bRoomMatch - aRoomMatch;
          })
          .slice(0, 4);

        console.log(
          `Using fallback: showing ${fallbackProducts.length} products`
        );
        setRelatedProducts(fallbackProducts);
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
