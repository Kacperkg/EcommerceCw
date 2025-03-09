import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs
} from "firebase/firestore";
import {
  getStorage,

} from "firebase/storage";
import {
  User,
  Product,
  Category,
  Order,
  Filter,
  Payment,
  Review,
  Wishlist,
  Shipping,
  Points,
  Coupon,
  Cart,
} from "../types/DatabaseTypes";

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

// Get User by ID
export const getUserById = async (userId: string): Promise<User | undefined> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? (userDoc.data() as User) : undefined;
};

// Get Product by ID
export const getProductById = async (productId: string): Promise<Product | undefined> => {
  const productDoc = await getDoc(doc(db, "products", productId));
  return productDoc.exists() ? (productDoc.data() as Product) : undefined;
};

// Get All Products
export const getAllProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), productId: doc.id }) as Product);
};

// Get Category by ID
export const getCategoryById = async (categoryId: string): Promise<Category | undefined> => {
  const categoryDoc = await getDoc(doc(db, "categories", categoryId));
  return categoryDoc.exists() ? (categoryDoc.data() as Category) : undefined;
};

// Get Order by ID
export const getOrderById = async (orderId: string): Promise<Order | undefined> => {
  const orderDoc = await getDoc(doc(db, "orders", orderId));
  return orderDoc.exists() ? (orderDoc.data() as Order) : undefined;
};

// Get Payment by ID
export const getPaymentById = async (paymentId: string): Promise<Payment | undefined> => {
  const paymentDoc = await getDoc(doc(db, "payments", paymentId));
  return paymentDoc.exists() ? (paymentDoc.data() as Payment) : undefined;
};

// Get Review by ID
export const getReviewById = async (reviewId: string): Promise<Review | undefined> => {
  const reviewDoc = await getDoc(doc(db, "reviews", reviewId));
  return reviewDoc.exists() ? (reviewDoc.data() as Review) : undefined;
};

// Get Wishlist by ID
export const getWishlistById = async (wishlistId: string): Promise<Wishlist | undefined> => {
  const wishlistDoc = await getDoc(doc(db, "wishlists", wishlistId));
  return wishlistDoc.exists() ? (wishlistDoc.data() as Wishlist) : undefined;
};

// Get Shipping by ID
export const getShippingById = async (shippingId: string): Promise<Shipping | undefined> => {
  const shippingDoc = await getDoc(doc(db, "shippings", shippingId));
  return shippingDoc.exists() ? (shippingDoc.data() as Shipping) : undefined;
};

// Get Coupon by ID
export const getCouponById = async (couponId: string): Promise<Coupon | undefined> => {
  const couponDoc = await getDoc(doc(db, "coupons", couponId));
  return couponDoc.exists() ? (couponDoc.data() as Coupon) : undefined;
};

// Get Cart by ID
export const getCartById = async (cartId: string): Promise<Cart | undefined> => {
  const cartDoc = await getDoc(doc(db, "carts", cartId));
  return cartDoc.exists() ? (cartDoc.data() as Cart) : undefined;
};

// Get Points by ID
export const getPointsById = async (pointId: string): Promise<Points | undefined> => {
  const pointsDoc = await getDoc(doc(db, "points", pointId));
  return pointsDoc.exists() ? (pointsDoc.data() as Points) : undefined;
};

// Get Filter by ID
export const getFilterById = async (filterId: string): Promise<Filter | undefined> => {
  const filterDoc = await getDoc(doc(db, "filters", filterId));
  return filterDoc.exists() ? (filterDoc.data() as Filter) : undefined;
};

// Set User
export const setUser = async (user: User): Promise<void> => {
  await setDoc(doc(db, "users", user.userId), user);
};

// Set Product
export const setProduct = async (product: Product): Promise<void> => {
  await setDoc(doc(db, "products", product.productId), product);
};

// Set Category
export const setCategory = async (category: Category): Promise<void> => {
  await setDoc(doc(db, "categories", category.categoryId), category);
};

// Set Order
export const setOrder = async (order: Order): Promise<void> => {
  await setDoc(doc(db, "orders", order.orderId), order);
};

// Set Payment
export const setPayment = async (payment: Payment): Promise<void> => {
  await setDoc(doc(db, "payments", payment.paymentId), payment);
};

// Set Review
export const setReview = async (review: Review): Promise<void> => {
  await setDoc(doc(db, "reviews", review.reviewId), review);
};

// Set Wishlist
export const setWishlist = async (wishlist: Wishlist): Promise<void> => {
  await setDoc(doc(db, "wishlists", wishlist.wishlistId), wishlist);
};

// Set Shipping
export const setShipping = async (shipping: Shipping): Promise<void> => {
  await setDoc(doc(db, "shippings", shipping.shippingId), shipping);
};

// Set Coupon
export const setCoupon = async (coupon: Coupon): Promise<void> => {
  await setDoc(doc(db, "coupons", coupon.couponId), coupon);
};

// Set Cart
export const setCart = async (cart: Cart): Promise<void> => {
  await setDoc(doc(db, "carts", cart.cartId), cart);
};

// Set Points
export const setPoints = async (points: Points): Promise<void> => {
  await setDoc(doc(db, "points", points.pointId), points);
};

// Set Filter
export const setFilter = async (filter: Filter): Promise<void> => {
  await setDoc(doc(db, "filters", filter.filterId), filter);
};
