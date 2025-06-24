export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string; 
  description: string;
}

export interface CartItem extends Book {
  quantity: number;
}