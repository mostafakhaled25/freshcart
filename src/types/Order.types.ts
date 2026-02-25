export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  id: string;
  subcategory: Subcategory[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

export interface Order {
  _id: string;
  id: number;
  user: User;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string; 
  createdAt: string;
  updatedAt: string;
}