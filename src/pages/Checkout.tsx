import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainButton } from "../components/MainButton";
import { motion } from "framer-motion";
import { db } from "../firebase/fetches";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface CartItem {
  productId: string;
  name: string;
  cost: number;
  quantity: number;
  images?: string[];
  room?: string;
  color?: string;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryOption, setDeliveryOption] = useState("home"); // "home" or "collect"
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [userLoyaltyPoints, setUserLoyaltyPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: "",
    specialInstructions: "",
  });
  const [savedAddresses, setSavedAddresses] = useState<
    (typeof deliveryAddress)[]
  >([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1); // -1 means new address
  const [saveAddress, setSaveAddress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);

    // Fetch user's current loyalty points and saved addresses
    const fetchUserData = async () => {
      const userId = localStorage.getItem("USER_ID");
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserLoyaltyPoints(userData.loyaltyPoints || 0);

            // Load saved addresses if they exist
            if (
              userData.deliveryAddresses &&
              userData.deliveryAddresses.length > 0
            ) {
              setSavedAddresses(userData.deliveryAddresses);
              // Set the last used address as default
              setSelectedAddressIndex(0);
              setDeliveryAddress(userData.deliveryAddresses[0]);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );
  const shipping = deliveryOption === "home" ? 20 : 0;

  // Calculate points discount (£1 for every 50 points)
  const maxPointsValue = Math.min(
    Math.floor(userLoyaltyPoints / 50),
    Math.floor(subtotal + shipping)
  );
  const pointsDiscount = usePoints ? maxPointsValue : 0;
  const pointsUsed = pointsDiscount * 50;

  const total = subtotal + shipping - pointsDiscount;
  const loyaltyPoints = Math.floor(total);
  const pointsValue = Math.floor(loyaltyPoints / 50);

  const toggleUsePoints = () => {
    setUsePoints(!usePoints);
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If user modifies address, they're no longer using a saved one
    if (selectedAddressIndex !== -1) {
      setSelectedAddressIndex(-1);
    }
  };

  const handleSavedAddressSelect = (index: number) => {
    if (index === -1) {
      // New address selected
      setDeliveryAddress({
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postcode: "",
        specialInstructions: "",
      });
    } else {
      // Saved address selected
      setDeliveryAddress(savedAddresses[index]);
    }
    setSelectedAddressIndex(index);
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("USER_ID");

    // Check if delivery address is required and provided
    if (
      deliveryOption === "home" &&
      (!deliveryAddress.fullName ||
        !deliveryAddress.addressLine1 ||
        !deliveryAddress.city ||
        !deliveryAddress.postcode)
    ) {
      alert("Please complete all required address fields");
      return;
    }

    // Create order object
    const order = {
      items: cartItems,
      subtotal,
      shipping,
      pointsUsed: usePoints ? pointsUsed : 0,
      pointsDiscount,
      total,
      deliveryOption,
      deliveryAddress: deliveryOption === "home" ? deliveryAddress : null,
      loyaltyPoints,
      date: serverTimestamp(),
      status: "Processing",
    };

    try {
      // If user is logged in, save order to their account and update loyalty points
      if (userId) {
        // Add order to orders collection
        await addDoc(collection(db, "users", userId, "orders"), order);

        // Update user's loyalty points and save delivery address if requested
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const currentPoints = userData.loyaltyPoints || 0;
          // Subtract used points and add newly earned points
          const newPoints =
            currentPoints - (usePoints ? pointsUsed : 0) + loyaltyPoints;

          const updateData: {
            loyaltyPoints: number;
            deliveryAddresses?: (typeof deliveryAddress)[];
          } = {
            loyaltyPoints: newPoints,
          };

          // Save delivery address if home delivery is selected and user wants to save it
          if (
            deliveryOption === "home" &&
            saveAddress &&
            selectedAddressIndex === -1
          ) {
            const existingAddresses = userData.deliveryAddresses || [];
            // Check if address already exists (compare by addressLine1 and postcode)
            const addressExists = existingAddresses.some(
              (addr: typeof deliveryAddress) =>
                addr.addressLine1 === deliveryAddress.addressLine1 &&
                addr.postcode === deliveryAddress.postcode
            );

            if (!addressExists) {
              updateData.deliveryAddresses = [
                ...existingAddresses,
                deliveryAddress,
              ];
            }
          }

          await updateDoc(doc(db, "users", userId), updateData);
        }
      }

      setCheckoutComplete(true);
      // Clear cart after purchase
      localStorage.setItem("cart", "[]");
    } catch (error) {
      console.error("Error processing checkout:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  const handleReturnHome = () => {
    navigate("/");
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

              {/* Delivery Address Form */}
              {deliveryOption === "home" && (
                <div className="mt-[32px] border-t pt-[32px]">
                  <h2 className="text-3xl font-[400] mb-[32px]">
                    Delivery Address
                  </h2>

                  {/* Saved addresses selection */}
                  {savedAddresses.length > 0 && (
                    <div className="mb-[24px]">
                      <h3 className="text-xl mb-[16px]">Select an address:</h3>
                      <div className="flex flex-col gap-[12px]">
                        {savedAddresses.map((address, index) => (
                          <label
                            key={index}
                            className="flex items-center gap-[12px] cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="savedAddress"
                              checked={selectedAddressIndex === index}
                              onChange={() => handleSavedAddressSelect(index)}
                              className="w-[18px] h-[18px]"
                            />
                            <span>
                              {address.fullName}, {address.addressLine1},
                              {address.addressLine2 &&
                                ` ${address.addressLine2},`}{" "}
                              {address.city}, {address.postcode}
                            </span>
                          </label>
                        ))}
                        <label className="flex items-center gap-[12px] cursor-pointer">
                          <input
                            type="radio"
                            name="savedAddress"
                            checked={selectedAddressIndex === -1}
                            onChange={() => handleSavedAddressSelect(-1)}
                            className="w-[18px] h-[18px]"
                          />
                          <span className="font-medium">Add a new address</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Address form (either new or editing selected) */}
                  {(selectedAddressIndex === -1 ||
                    savedAddresses.length === 0) && (
                    <div className="grid grid-cols-2 gap-[16px]">
                      <div className="col-span-2">
                        <label className="block mb-[8px]">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={deliveryAddress.fullName}
                          onChange={handleAddressChange}
                          className="border p-[12px] w-full"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block mb-[8px]">
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          name="addressLine1"
                          value={deliveryAddress.addressLine1}
                          onChange={handleAddressChange}
                          className="border p-[12px] w-full"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block mb-[8px]">Address Line 2</label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={deliveryAddress.addressLine2}
                          onChange={handleAddressChange}
                          className="border p-[12px] w-full"
                        />
                      </div>
                      <div>
                        <label className="block mb-[8px]">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={deliveryAddress.city}
                          onChange={handleAddressChange}
                          className="border p-[12px] w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-[8px]">Postcode *</label>
                        <input
                          type="text"
                          name="postcode"
                          value={deliveryAddress.postcode}
                          onChange={handleAddressChange}
                          className="border p-[12px] w-full"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block mb-[8px]">
                          Special Instructions
                        </label>
                        <textarea
                          name="specialInstructions"
                          value={deliveryAddress.specialInstructions}
                          onChange={handleAddressChange}
                          className="border p-[12px] w-full"
                          rows={3}
                          placeholder="Any special delivery instructions..."
                        />
                      </div>
                      <div className="col-span-2 mt-[8px]">
                        <label className="flex items-center gap-[12px] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={saveAddress}
                            onChange={() => setSaveAddress(!saveAddress)}
                            className="w-[18px] h-[18px]"
                          />
                          <span>Save this address for future orders</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <CheckoutSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              loyaltyPoints={loyaltyPoints}
              pointsValue={pointsValue}
              onCheckout={handleCheckout}
              userLoyaltyPoints={userLoyaltyPoints}
              usePoints={usePoints}
              toggleUsePoints={toggleUsePoints}
              pointsDiscount={pointsDiscount}
              pointsUsed={pointsUsed}
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
            <div className="mt-[32px]" onClick={handleReturnHome}>
              <MainButton name="RETURN TO HOME" />
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
};

const CheckoutItem = ({ item }: { item: CartItem }) => {
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

interface CheckoutSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  loyaltyPoints: number;
  pointsValue: number;
  onCheckout: () => void;
  userLoyaltyPoints: number;
  usePoints: boolean;
  toggleUsePoints: () => void;
  pointsDiscount: number;
  pointsUsed: number;
}

const CheckoutSummary = ({
  subtotal,
  shipping,
  total,
  loyaltyPoints,
  pointsValue,
  onCheckout,
  userLoyaltyPoints,
  usePoints,
  toggleUsePoints,
  pointsDiscount,
  pointsUsed,
}: CheckoutSummaryProps) => {
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

      {userLoyaltyPoints > 0 && (
        <div className="flex flex-col gap-[8px] border-t border-b py-[16px]">
          <div className="flex items-center gap-[12px]">
            <input
              type="checkbox"
              id="usePoints"
              checked={usePoints}
              onChange={toggleUsePoints}
              className="w-[20px] h-[20px]"
            />
            <label htmlFor="usePoints" className="text-lg cursor-pointer">
              Use {pointsUsed} loyalty points
            </label>
          </div>
          {usePoints && (
            <div className="flex justify-between text-xl text-green-600">
              <span>Points discount</span>
              <span>-£{pointsDiscount}</span>
            </div>
          )}
          <p className="text-sm text-gray-500">
            You have {userLoyaltyPoints} points available (worth £
            {Math.floor(userLoyaltyPoints / 50)})
          </p>
        </div>
      )}

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
