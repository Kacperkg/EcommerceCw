import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainButton } from "../components/MainButton";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedItems = cartItems
      .map((item) =>
        item.productId === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <>
      <div className="m-auto mt-[32px] mb-[128px]">
        <Navbar />
      </div>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="max-w-[1440px] m-auto flex gap-[64px] justify-between">
          <div className="flex-1 flex flex-col gap-[64px]">
            {cartItems.map((item) => (
              <CartItems
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
          <CartSummary cartItems={cartItems} />
        </div>
      )}
      <Footer />
    </>
  );
};

const EmptyCart = () => {
  return (
    <div className="max-w-[1440px] m-auto flex flex-col items-center justify-center py-[64px] min-h-[400px]">
      <h1 className="text-4xl mb-[32px]">YOUR CART IS EMPTY</h1>
      <p className="text-2xl mb-[48px]">Add some products to begin shopping</p>
      <a href="/explore">
        <MainButton name="EXPLORE PRODUCTS" />
      </a>
    </div>
  );
};

const CartItems = ({ item, updateQuantity }) => {
  return (
    <>
      <ul className="flex gap-[32px] w-full uppercase text-left">
        <li>
          <div className="min-w-[450px] aspect-square">
            {item.images && item.images[0] && (
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </li>
        <li className="w-full">
          <h1 className="text-4xl text-(--secondary) mb-[16px]">{item.name}</h1>
          <h2 className="text-4xl font-[500] mb-[64px]">£{item.cost}</h2>
          <div className="text-2xl flex justify-between mb-[8px]">
            <h4>ROOM:</h4>
            <h4>{item.room}</h4>
          </div>
          <div className="text-2xl flex justify-between">
            <h4>COLOUR:</h4>
            <h4>{item.color}</h4>
          </div>
          <div className="flex justify-between mt-[64px] text-3xl items-center max-w-[200px]">
            <button
              className="border p-[8px]"
              onClick={() => updateQuantity(item.productId, -1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <h3>{item.quantity}</h3>
            <button
              className="border p-[8px]"
              onClick={() => updateQuantity(item.productId, 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

const CartSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );
  const shipping = 20; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <>
      <div className="border p-[32px] flex flex-col justify-around w-[450px] h-[450px]">
        <h1 className="text-4xl">ORDER SUMMARY</h1>
        <div className="flex justify-between text-2xl">
          <h2>Subtotal</h2>
          <h2>£{subtotal}</h2>
        </div>
        <div className="flex justify-between text-2xl">
          <h2>Shipping</h2>
          <h2>£{shipping}</h2>
        </div>
        <div className="flex justify-between text-2xl">
          <h2>Total</h2>
          <h2>£{total}</h2>
        </div>
        <div className="ml-auto mr-auto">
          <a href="/checkout">
            <MainButton name="CHECKOUT" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Cart;
