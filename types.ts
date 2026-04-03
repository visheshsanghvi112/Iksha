export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
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