export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  secondaryImage?: string;
  gallery?: string[];
  category: string;
  subCategory?: string;
  tags?: string[];
  description: string;
  details: string[];
  inStock: boolean;
  isNew?: boolean;
  featured?: boolean;
  sizeStock?: { size: string; stock: number }[];
}

export interface CartItem {
  id: string; // productId + size
  productId: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
  maxStock: number;
}
