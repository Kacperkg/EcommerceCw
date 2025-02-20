import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  User,
  CartItem,
  Product,
  Category,
  Order,
  OrderItem,
} from "../types/types";

const firebaseConfig = {
  apiKey: "AIzaSyB50dBZcPhp1WqNxzshrJlIdB6UHw3DZao",
  authDomain: "ecommercecw-b7a24.firebaseapp.com",
  projectId: "ecommercecw-b7a24",
  storageBucket: "ecommercecw-b7a24.firebasestorage.app",
  messagingSenderId: "324553281505",
  appId: "1:324553281505:web:62b7d04bd16aa7ab32cca0",
  measurementId: "G-XTPPR74DKP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

/** Firestore CRUD Operations **/

// Fetch a document
async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
}

// Create or update a document
async function setDocument<T>(collectionName: string, id: string, data: T): Promise<void> {
  await setDoc(doc(db, collectionName, id), data);
}

// Update a document partially
async function updateDocument(collectionName: string, id: string, data: Partial<any>): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

// Delete a document
async function deleteDocument(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

// Fetch all documents in a collection
async function getAllDocuments<T>(collectionName: string): Promise<T[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => doc.data() as T);
}

/** Firebase Storage **/

// Upload image
async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Delete image
async function deleteImage(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

/** Specific Fetch Functions for Each Interface **/
export const getUser = (id: string) => getDocument<User>("users", id);
export const setUser = (id: string, data: User) => setDocument("users", id, data);
export const updateUser = (id: string, data: Partial<User>) => updateDocument("users", id, data);
export const deleteUser = (id: string) => deleteDocument("users", id);

export const getProduct = (id: string) => getDocument<Product>("products", id);
export const setProduct = (id: string, data: Product) => setDocument("products", id, data);
export const updateProduct = (id: string, data: Partial<Product>) => updateDocument("products", id, data);
export const deleteProduct = (id: string) => deleteDocument("products", id);

export const getCategory = (id: string) => getDocument<Category>("categories", id);
export const setCategory = (id: string, data: Category) => setDocument("categories", id, data);
export const updateCategory = (id: string, data: Partial<Category>) => updateDocument("categories", id, data);
export const deleteCategory = (id: string) => deleteDocument("categories", id);

export const getOrder = (id: string) => getDocument<Order>("orders", id);
export const setOrder = (id: string, data: Order) => setDocument("orders", id, data);
export const updateOrder = (id: string, data: Partial<Order>) => updateDocument("orders", id, data);
export const deleteOrder = (id: string) => deleteDocument("orders", id);

/** Firebase REST API Alternative **/
// Instead of Firebase SDK, you can use the REST API like this:
// Example GET request: fetch(`https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/users/${id}`)

export { uploadImage, deleteImage, getAllDocuments }
