import Image from 'next/image';
import { Book } from '@/types';
import AddToCartButton from '@/components/AddToCartButton'; 


async function getBook(id: any): Promise<Book | undefined> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/books.json`);
  if (!res.ok) {
    console.error('Failed to fetch books for detail page:', res.status, res.statusText);
    return undefined;
  }
  const books: Book[] = await res.json();
  return books.find(book => book.id === id);
}

export default async function BookDetailPage({ params }: { params: { id: any } }) {
  const { id } = params;
  const book = await getBook(id);

  if (!book) {
    return (
      <main className="container mx-auto p-8 text-center min-h-[80vh] flex items-center justify-center">
        <p className="text-xl text-red-500">Livro não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8 flex flex-col md:flex-row items-center md:items-start gap-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-800/50 my-8">
      <div className="md:w-1/3 flex-shrink-0">
        <Image src={book.image} alt={book.title} width={350} height={500} className="w-full h-auto object-cover rounded-lg shadow-lg dark:shadow-gray-700/50" />
      </div>
      <div className="md:w-2/3 flex-grow text-center md:text-left">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">{book.title}</h1>
        <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-4">Por: {book.author}</p>
        <p className="text-4xl font-extrabold text-green-600 dark:text-green-400 mb-6">R$ {book.price.toFixed(2)}</p>
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-8">{book.description}</p>
        <AddToCartButton book={book} />
      </div>
    </main>
  );
}