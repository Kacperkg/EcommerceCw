import { useState } from "react";
import { db } from "../firebase/fetches";
import { doc, getDoc } from "firebase/firestore";

const LoginForm = ({
  onLogin,
  onBack,
}: {
  onLogin: (user: {
    fullName: string;
    email: string;
    password: string;
  }) => void;
  onBack: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", email));
      if (userDoc.exists() && userDoc.data().password === password) {
        onLogin(
          userDoc.data() as {
            fullName: string;
            email: string;
            password: string;
          }
        );
        alert("Login successful!");
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "0.5rem", color: "#4E4B46" }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#D6CFC7",
            color: "#4E4B46",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            width: "100%",
          }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "0.5rem", color: "#4E4B46" }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#D6CFC7",
            color: "#4E4B46",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            width: "100%",
          }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: "#7A746E",
          color: "#FFFFFF",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          marginRight: "0.5rem",
        }}
      >
        Login
      </button>
      <button
        onClick={onBack}
        style={{
          backgroundColor: "#C1B6A4",
          color: "#FFFFFF",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default LoginForm;
