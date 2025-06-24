import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types';

async function getBooks(): Promise<Book[]> {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/books.json`)

  if (!res.ok) {
    console.error('Failed to fetch books:', res.status, res.statusText);
    return []; 
  }
  return res.json();
}

export default async function HomePage() {
  const books = await getBooks();

  if (!books.length) {
    return (
      <main className="container mx-auto p-8 text-center min-h-[80vh] flex items-center justify-center">
        <p className="text-xl text-gray-600">Nenhum livro encontrado no momento.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-700 dark:text-blue-400">Nossa Coleção de Livros</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-800/50 overflow-hidden flex flex-col transition-transform transform hover:scale-105 bg-white dark:bg-gray-800">
            <div className="relative w-full h-64">
              <Image
                src={book.image}
                alt={book.title}
                width={50}
                height={50}
                objectFit="cover"
                className="rounded-t-xl"
                priority={book.id === '1'} 
              />
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3 text-lg">{book.author}</p>
              <p className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-4">R$ {book.price.toFixed(2)}</p>
              <Link href={`/books/${book.id}`} className="mt-auto block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200">
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}