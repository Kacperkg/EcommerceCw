import React, { useState } from "react";
import { ProductFormData } from "../types/DatabaseTypes";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const Admin: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    rating: 0,
    cost: 0,
    stock: 0,
    images: [],
    categories: [],
    room: [],
    colour: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "categories" || name === "room" || name === "colour") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim().toLowerCase()),
      });
    } else if (name === "images") {
      setFormData({
        ...formData,
        images: value
          .split(",")
          .map((item) => `../assets/products/${formData.name}/${item.trim()}`),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await setDoc(
        doc(db, "products", formData.name),
        productData
      );
      console.log("Document written with ID: ", formData.name);
      // Reset form after submission
      setFormData({
        name: "",
        description: "",
        rating: 0,
        cost: 0,
        stock: 0,
        images: [],
        categories: [],
        room: [],
        colour: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cost
          </label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images (comma separated names)
          </label>
          <input
            type="text"
            name="images"
            value={formData.images
              .map((image) =>
                image.replace(`../assets/products/${formData.name}/`, "")
              )
              .join(", ")}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <input
            type="text"
            name="categories"
            value={formData.categories.join(", ")}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Room
          </label>
          <input
            type="text"
            name="room"
            value={formData.room.join(", ")}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Colour
          </label>
          <input
            type="text"
            name="colour"
            value={formData.colour.join(", ")}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Admin;
