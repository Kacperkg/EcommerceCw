import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { db } from "../firebase/fetches";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

const Account = () => {
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [orders, setOrders] = useState<
    Array<{
      id: string;
      date: string;
      status?: string;
      total?: number;
      loyaltyPoints?: number;
      items?: Array<{
        name: string;
        room?: string;
        color?: string;
        cost: number;
        quantity: number;
        images?: string[];
      }>;
      deliveryOption?: string;
    }>
  >([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("USER_ID");
      if (!userId) {
        setLoading(false);
        return;
      }
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (
          userData &&
          userData.fullName &&
          userData.email &&
          userData.password
        ) {
          setUser({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
          });
        } else {
          console.error("Invalid user data:", userData);
        }
        setLoyaltyPoints(userData.loyaltyPoints || 0);
        setIsLoggedIn(true);

        // Fetch orders
        await fetchOrders(userId);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const fetchOrders = async (userId: string) => {
    try {
      const ordersQuery = query(
        collection(db, "users", userId, "orders"),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(ordersQuery);
      const ordersList: Array<{
        id: string;
        date: string;
        status?: string;
        total?: number;
        loyaltyPoints?: number;
        items?: Array<{
          name: string;
          room?: string;
          color?: string;
          cost: number;
          quantity: number;
          images?: string[];
        }>;
        deliveryOption?: string;
      }> = [];
      querySnapshot.forEach((doc) => {
        ordersList.push({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate()?.toLocaleDateString() || "N/A",
        });
      });
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleUpdate = async () => {
    const userId = localStorage.getItem("USER_ID");
    if (!userId) {
      alert("No user logged in.");
      return;
    }
    try {
      await updateDoc(doc(db, "users", userId), user);
      alert("Details updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update details.");
    }
  };

  const handleSignUp = async (newUser: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    // Initialize a new user with 0 loyalty points
    const userWithLoyalty = { ...newUser, loyaltyPoints: 0 };
    setUser(userWithLoyalty);
    setLoyaltyPoints(0);
    localStorage.setItem("USER_ID", newUser.email);
    setIsLoggedIn(true);
    setShowSignUp(false);
  };

  const handleLogin = async (loggedInUser: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    setUser(loggedInUser);
    // Loyalty points will be fetched in the useEffect
    localStorage.setItem("USER_ID", loggedInUser.email);
    setIsLoggedIn(true);
    setShowLogin(false);

    // Fetch orders for the logged in user
    await fetchOrders(loggedInUser.email);
  };

  const handleLogout = () => {
    setUser({ fullName: "", email: "", password: "" });
    setIsLoggedIn(false);
    setLoyaltyPoints(0);
    setOrders([]);
    localStorage.removeItem("USER_ID");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-[#F5F1E8] min-h-screen mt-10">
      <Navbar />
      <main className="max-w-4xl mx-auto mt-10 py-10 px-6 bg-[#FAF7F2] shadow-lg border border-[#D6CFC7]">
        {!isLoggedIn ? (
          <>
            <div className="text-center space-y-4">
              {!showLogin && !showSignUp && (
                <>
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setShowSignUp(false);
                    }}
                    className="bg-[#7A746E] text-white py-2 px-4 rounded-lg hover:bg-[#4E4B46] transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowSignUp(true);
                      setShowLogin(false);
                    }}
                    className="bg-[#C1B6A4] text-white py-2 px-4 rounded-lg hover:bg-[#A19182] transition ml-4"
                  >
                    Sign Up
                  </button>
                </>
              )}

              {showLogin && (
                <LoginForm
                  onLogin={handleLogin}
                  onBack={() => setShowLogin(false)}
                />
              )}
              {showSignUp && (
                <SignUpForm
                  onSignUp={handleSignUp}
                  onBack={() => setShowSignUp(false)}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <section className="flex items-center gap-6 border-b border-[#D6CFC7] pb-6">
              <div className="w-24 h-24 bg-[#C1B6A4] rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {user.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-[#4E4B46]">
                  {user.fullName}
                </h2>
                <p className="text-[#7A746E]">{user.email}</p>
              </div>
              <div className="flex items-center justify-center bg-[#EFE9DE] rounded-lg p-4 shadow-sm">
                <div className="text-center">
                  <p className="text-[#4E4B46] text-sm">Loyalty Points</p>
                  <p className="text-2xl font-bold text-[#7A746E]">
                    {loyaltyPoints}
                  </p>
                  <p className="text-xs text-[#7A746E]">
                    Worth £{Math.floor(loyaltyPoints / 50).toFixed(2)}
                  </p>
                </div>
              </div>
            </section>

            <div className="flex border-b border-[#D6CFC7] mt-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2 ${
                  activeTab === "details"
                    ? "border-b-2 border-[#7A746E] font-medium"
                    : ""
                }`}
              >
                Account Details
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 ${
                  activeTab === "orders"
                    ? "border-b-2 border-[#7A746E] font-medium"
                    : ""
                }`}
              >
                Orders
              </button>
            </div>

            {activeTab === "details" && (
              <section className="mt-6">
                <h3 className="text-lg font-semibold text-[#4E4B46] mb-4">
                  Account Details
                </h3>
                <div className="grid gap-4">
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) =>
                      setUser({ ...user, fullName: e.target.value })
                    }
                    style={{
                      backgroundColor: "#FAF7F2",
                      borderColor: "#D6CFC7",
                      color: "#4E4B46",
                    }}
                    className="p-2 rounded-lg"
                  />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    style={{
                      backgroundColor: "#FAF7F2",
                      borderColor: "#D6CFC7",
                      color: "#4E4B46",
                    }}
                    className="p-2 rounded-lg"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-[#7A746E] text-white py-2 px-4 hover:bg-[#4E4B46] transition"
                  >
                    Update Details
                  </button>
                </div>
              </section>
            )}

            {activeTab === "orders" && (
              <section className="mt-6">
                <h3 className="text-lg font-semibold text-[#4E4B46] mb-4">
                  Your Orders
                </h3>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-[#D6CFC7] rounded-lg p-4 bg-white"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <p className="font-medium">
                              Order Date: {order.date}
                            </p>
                            <p className="text-sm text-[#7A746E]">
                              Status: {order.status}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">Total: £{order.total}</p>
                            <p className="text-sm text-[#7A746E]">
                              Points earned: {order.loyaltyPoints}
                            </p>
                          </div>
                        </div>

                        <h4 className="font-medium border-b pb-1 mb-2">
                          Items
                        </h4>
                        {order.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between py-2 border-b border-dotted"
                          >
                            <div className="flex gap-3">
                              {item.images && item.images[0] && (
                                <img
                                  src={item.images[0]}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-[#7A746E]">
                                  Room: {item.room}, Color: {item.color}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p>
                                £{item.cost} × {item.quantity}
                              </p>
                              <p className="font-medium">
                                £{item.cost * item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="mt-3 text-sm text-[#7A746E]">
                          <p>
                            Delivery:{" "}
                            {order.deliveryOption === "home"
                              ? "Home Delivery (£20)"
                              : "Click and Collect (Free)"}
                          </p>
                        </div>
                        <div className="mt-4 text-right">
                          <button
                            className="bg-[#C1B6A4] text-white py-1 px-3 text-sm rounded hover:bg-[#A19182] transition"
                            onClick={() =>
                              alert(
                                "We will contact you via email to arrange a refund."
                              )
                            }
                          >
                            Request Refund
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-[#7A746E]">
                    <p>You haven't placed any orders yet.</p>
                  </div>
                )}
              </section>
            )}

            <div className="text-center mt-8">
              <button
                onClick={handleLogout}
                className="bg-[#C1B6A4] text-white py-2 px-4 hover:bg-[#A19182] transition"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Account;
