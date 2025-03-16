import React, { useState } from "react";
import { db } from "../firebase/fetches";
import { doc, setDoc } from "firebase/firestore";

const SignUpForm = ({ onSignUp, onBack }: { onSignUp: (user: { fullName: string; email: string; password: string }) => void, onBack: () => void }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const newUser = { fullName, email, password };
      await setDoc(doc(db, "users", email), newUser);
      onSignUp(newUser);
      alert("Sign up successful!");
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An error occurred while signing up.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="fullName" style={{ display: "block", marginBottom: "0.5rem", color: "#4E4B46" }}>Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ backgroundColor: "#FFFFFF", borderColor: "#D6CFC7", color: "#4E4B46", padding: "0.5rem", borderRadius: "0.5rem", width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", color: "#4E4B46" }}>Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ backgroundColor: "#FFFFFF", borderColor: "#D6CFC7", color: "#4E4B46", padding: "0.5rem", borderRadius: "0.5rem", width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", color: "#4E4B46" }}>Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ backgroundColor: "#FFFFFF", borderColor: "#D6CFC7", color: "#4E4B46", padding: "0.5rem", borderRadius: "0.5rem", width: "100%" }}
        />
      </div>
      <button onClick={handleSignUp} style={{ backgroundColor: "#7A746E", color: "#FFFFFF", padding: "0.5rem 1rem", borderRadius: "0.5rem", marginRight: "0.5rem" }}>
        Sign Up
      </button>
      <button onClick={onBack} style={{ backgroundColor: "#C1B6A4", color: "#FFFFFF", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
        Back
      </button>
    </div>
  );
};

export default SignUpForm;
