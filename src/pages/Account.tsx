import React from "react";
import Navbar from "../components/Navbar";

const Account = () => {
  return (
    <div className="bg-[#F5F1E8] min-h-screen mt-8">
      <Navbar />
      <main className="max-w-4xl mx-auto mt-10 py-10 px-6 bg-[#FAF7F2] shadow-lg rounded-lg border border-[#D6CFC7]">
        {/* Profile Section */}
        <section className="flex items-center gap-6 border-b border-[#D6CFC7] pb-6">
          <div className="w-24 h-24 bg-[#C1B6A4] rounded-full flex items-center justify-center text-white text-xl font-semibold">
            JD
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#4E4B46]">John Doe</h2>
            <p className="text-[#7A746E]">user@example.com</p>
          </div>
        </section>

        {/* Account Details Section */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-[#4E4B46] mb-4">Account Details</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-[#7A746E]">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full p-2 border border-[#D6CFC7] bg-[#F5F1E8] focus:ring-2 focus:ring-[#C1B6A4]"
              />
            </div>
            <div>
              <label className="block text-[#7A746E]">Email</label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full p-2 border border-[#D6CFC7] bg-[#F5F1E8] focus:ring-2 focus:ring-[#C1B6A4]"
              />
            </div>
            <div>
              <label className="block text-[#7A746E]">Password</label>
              <input
                type="password"
                defaultValue="********"
                className="w-full p-2 border border-[#D6CFC7] bg-[#F5F1E8] focus:ring-2 focus:ring-[#C1B6A4]"
              />
            </div>
            <button className="bg-[#7A746E] text-white py-2 px-4 hover:bg-[#4E4B46] transition">
              Update Details
            </button>
          </div>
        </section>

        {/* Order History Section */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-[#4E4B46] mb-4">Order History</h3>
          <div className="bg-[#F5F1E8] p-4 border border-[#D6CFC7]">
            <ul className="space-y-3">
              <li className="p-3 bg-[#FAF7F2] shadow-sm border border-[#D6CFC7]">
                <span className="font-medium text-[#4E4B46]">Order #1234</span> – £50.00 – <span className="text-green-600">Delivered</span>
              </li>
              <li className="p-3 bg-[#FAF7F2] shadow-sm border border-[#D6CFC7]">
                <span className="font-medium text-[#4E4B46]">Order #1235</span> – £75.00 – <span className="text-yellow-600">Processing</span>
              </li>
              <li className="p-3 bg-[#FAF7F2] shadow-sm border border-[#D6CFC7]">
                <span className="font-medium text-[#4E4B46]">Order #1236</span> – £20.00 – <span className="text-red-600">Cancelled</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Loyalty Points Section */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-[#4E4B46] mb-4">Loyalty Points</h3>
          <div className="bg-[#F5F1E8] p-4 border border-[#D6CFC7]">
            <p className="text-[#4E4B46]">You have <span className="font-semibold">150</span> loyalty points.</p>
            <p className="text-[#7A746E] mt-2">Earn more points by making purchases and participating in promotions.</p>
          </div>
        </section>

        {/* Logout Button */}
        <div className="text-center mt-8">
          <button className="bg-[#C1B6A4] text-white py-2 px-6 hover:bg-[#A19182] transition">
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Account;