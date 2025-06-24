'use client'; // É um componente cliente porque usa hooks do Redux
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { Book } from '@/types';

interface AddToCartButtonProps {
  book: Book;
}

export default function AddToCartButton({ book }: AddToCartButtonProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    alert(`${book.title} adicionado ao carrinho!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-green-600 dark:bg-green-500 text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200 shadow-md"
    >
      Adicionar ao Carrinho
    </button>
  );
}