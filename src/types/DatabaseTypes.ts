export interface User {
  userId: string;
  title: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  creationDate: string;
  points: number;
  wishlist: string[];
  cart: CartItem[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  cost: number;
  rating?: number; // Made the 'rating' property optional
  images: string[];
  colour?: string[]; // Changed from color to colour and made it an array of strings
  room?: string[]; // Added the 'room' property
  categories: string;
  filters: ProductFilters;
}

export interface ProductFilters {
  colour: string;
  material: string;
  priceRange: string;
}

export interface Category {
  categoryId: string;
  categoryName: string;
  availableFilters: string[];
}

export interface Order {
  orderId: string;
  userId: string;
  totalPrice: number;
  pointsUsed: number;
  finalPrice: number;
  status: string;
  createdDate: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Payment {
  paymentId: string;
  orderId: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  creationDate: string;
}

export interface Review {
  reviewId: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  creationDate: string;
}

export interface Wishlist {
  wishlistId: string;
  userId: string;
  productId: string;
  creationDate: string;
}

export interface Shipping {
  shippingId: string;
  orderId: string;
  userId: string;
  address: string;
  status: string;
  creationDate: string;
}

export interface Coupon {
  couponId: string;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderAmount: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  status: string;
}

export interface Cart {
  cartId: string;
  userId: string;
  productId: string;
  quantity: number;
}

export interface Points {
  pointId: string;
  userId: string;
  pointsEarned: number;
  pointsUsed: number;
  currentPoints: number;
}

export interface Filter {
  filterId: string;
  filterType: string;
  filterValue: string;
}
