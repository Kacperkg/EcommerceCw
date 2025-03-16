import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { db } from "../firebase/fetches";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Account = () => {
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("USER_ID");
      if (!userId) {
        setLoading(false);
        return;
      }
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUser(userDoc.data() as { fullName: string; email: string; password: string });
        setIsLoggedIn(true);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

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

  const handleSignUp = async (newUser: { fullName: string; email: string; password: string }) => {
    setUser(newUser);
    localStorage.setItem("USER_ID", newUser.email);
    setIsLoggedIn(true);
    setShowSignUp(false); // Close sign-up form after signing up
  };

  const handleLogin = async (loggedInUser: { fullName: string; email: string; password: string }) => {
    setUser(loggedInUser);
    localStorage.setItem("USER_ID", loggedInUser.email);
    setIsLoggedIn(true);
    setShowLogin(false); // Close login form after logging in
  };

  const handleLogout = () => {
    setUser({ fullName: "", email: "", password: "" });
    setIsLoggedIn(false);
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

              {showLogin && <LoginForm onLogin={handleLogin} onBack={() => setShowLogin(false)} />}
              {showSignUp && <SignUpForm onSignUp={handleSignUp} onBack={() => setShowSignUp(false)} />}
            </div>
          </>
        ) : (
          <>
            <section className="flex items-center gap-6 border-b border-[#D6CFC7] pb-6">
              <div className="w-24 h-24 bg-[#C1B6A4] rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {user.fullName.split(" ").map(name => name[0]).join("")}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#4E4B46]">{user.fullName}</h2>
                <p className="text-[#7A746E]">{user.email}</p>
              </div>
            </section>

            <section className="mt-6">
              <h3 className="text-lg font-semibold text-[#4E4B46] mb-4">Account Details</h3>
              <div className="grid gap-4">
                <input
                  type="text"
                  value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  style={{ backgroundColor: "#FAF7F2", borderColor: "#D6CFC7", color: "#4E4B46" }}
                  className="p-2 rounded-lg"
                />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  style={{ backgroundColor: "#FAF7F2", borderColor: "#D6CFC7", color: "#4E4B46" }}
                  className="p-2 rounded-lg"
                />
                <button onClick={handleUpdate} className="bg-[#7A746E] text-white py-2 px-4 hover:bg-[#4E4B46] transition">
                  Update Details
                </button>
              </div>
            </section>

            <div className="text-center mt-8">
              <button onClick={handleLogout} className="bg-[#C1B6A4] text-white py-2 px-4 hover:bg-[#A19182] transition">
                Logout
              </button>
              <button onClick={() => setIsLoggedIn(false)} className="bg-[#7A746E] text-white py-2 px-4 hover:bg-[#4E4B46] transition ml-4">
                Back to Login/Signup
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Account;
