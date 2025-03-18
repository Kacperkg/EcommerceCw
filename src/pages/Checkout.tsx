import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainButton } from "../components/MainButton";
import { motion } from "framer-motion";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("home"); // "home" or "collect"
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );
  const shipping = deliveryOption === "home" ? 20 : 0;
  const total = subtotal + shipping;
  const loyaltyPoints = Math.floor(total);
  const pointsValue = Math.floor(loyaltyPoints / 50);

  const handleCheckout = () => {
    setCheckoutComplete(true);
    // Clear cart after purchase
    localStorage.setItem("cart", "[]");
  };

  return (
    <>
      <div className="m-auto mt-[32px] mb-[128px]">
        <Navbar />
      </div>

      {!checkoutComplete ? (
        <div className="max-w-[1440px] m-auto flex flex-col gap-[64px]">
          <h1 className="text-5xl font-[400] mb-[32px]">Checkout</h1>

          <div className="flex gap-[64px] justify-between">
            <div className="flex-1 flex flex-col gap-[32px]">
              <h2 className="text-3xl font-[400]">Your Items</h2>
              {cartItems.map((item) => (
                <CheckoutItem key={item.productId} item={item} />
              ))}

              <div className="mt-[64px]">
                <h2 className="text-3xl font-[400] mb-[32px]">
                  Delivery Options
                </h2>
                <div className="flex flex-col gap-[16px]">
                  <label className="flex items-center gap-[16px] text-2xl cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === "home"}
                      onChange={() => setDeliveryOption("home")}
                      className="w-[24px] h-[24px]"
                    />
                    Home Delivery (£20)
                  </label>

                  <label className="flex items-center gap-[16px] text-2xl cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === "collect"}
                      onChange={() => setDeliveryOption("collect")}
                      className="w-[24px] h-[24px]"
                    />
                    Click and Collect (Free)
                  </label>
                </div>
              </div>
            </div>

            <CheckoutSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              loyaltyPoints={loyaltyPoints}
              pointsValue={pointsValue}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-[1440px] m-auto flex flex-col gap-[64px] items-center text-center py-[128px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-[32px]"
          >
            <h1 className="text-5xl font-[400]">
              Thank You For Your Purchase!
            </h1>
            <p className="text-3xl">
              You've earned{" "}
              <span className="font-bold">{loyaltyPoints} loyalty points</span>{" "}
              with this order.
            </p>
            <p className="text-xl">
              These points are worth approximately £{pointsValue.toFixed(2)} for
              your future purchases.
            </p>
            <div className="mt-[32px]">
              <MainButton name="RETURN TO HOME" />
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
};

const CheckoutItem = ({ item }) => {
  return (
    <div className="flex gap-[32px] w-full border-b pb-[32px]">
      <div className="w-[150px] aspect-square">
        {item.images && item.images[0] && (
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-2xl font-[500] mb-[16px]">{item.name}</h3>
        <div className="flex justify-between text-xl mb-[8px]">
          <span>Room: {item.room}</span>
          <span>Colour: {item.color}</span>
        </div>
        <div className="flex justify-between text-xl">
          <span>Quantity: {item.quantity}</span>
          <span className="font-[500]">£{item.cost * item.quantity}</span>
        </div>
      </div>
    </div>
  );
};

const CheckoutSummary = ({
  subtotal,
  shipping,
  total,
  loyaltyPoints,
  pointsValue,
  onCheckout,
}) => {
  return (
    <div className="border p-[32px] flex flex-col gap-[32px] w-[450px] h-fit sticky top-[32px]">
      <h2 className="text-3xl font-[400]">ORDER SUMMARY</h2>

      <div className="flex justify-between text-xl">
        <span>Subtotal</span>
        <span>£{subtotal}</span>
      </div>

      <div className="flex justify-between text-xl">
        <span>Shipping</span>
        <span>£{shipping}</span>
      </div>

      <div className="flex justify-between text-xl font-[500]">
        <span>Total</span>
        <span>£{total}</span>
      </div>

      <div className="border-t pt-[16px]">
        <h3 className="text-xl mb-[16px]">Loyalty Points</h3>
        <div className="text-lg flex flex-col gap-[8px] mb-[32px]">
          <div className="flex justify-between">
            <span>Points earned with this order:</span>
            <span className="font-[500]">{loyaltyPoints} points</span>
          </div>
          <div className="flex justify-between">
            <span>Value of points:</span>
            <span className="font-[500]">£{pointsValue.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-[8px]">
            (You earn 1 point for every £1 spent. 50 points = £1)
          </p>
        </div>
      </div>

      <div className="ml-auto mr-auto" onClick={onCheckout}>
        <MainButton name="CONTINUE" />
      </div>
    </div>
  );
};

export default Checkout;
