export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string | null;
}