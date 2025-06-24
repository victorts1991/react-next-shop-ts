'use client'; // MARCA ESTE COMPONENTE COMO CLIENT COMPONENT

import { Book } from '@/types';
import AddToCartButton from '@/components/AddToCartButton'; 

interface BookActionsClientProps {
  book: Book;
}

export default function BookActionsClient({ book }: BookActionsClientProps) {
  return (
    <div>
      {/* O AddToCartButton agora será renderizado dentro deste Client Component */}
      <AddToCartButton book={book} />
    </div>
  );
}