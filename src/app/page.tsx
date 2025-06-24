import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types';

import fs from 'fs/promises';
import path from 'path'; 

async function getBooks(): Promise<Book[]> {
  
  const filePath = path.join(process.cwd(), 'public', 'books.json')

  const fileContents = await fs.readFile(filePath, 'utf8')
  const books: Book[] = JSON.parse(fileContents);

  return books
}


export default async function HomePage() {
  const books = await getBooks();

  if (!books.length) {
    return (
      <main className="flex items-center justify-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <p className="text-2xl text-gray-600 dark:text-gray-400">Nenhum livro encontrado no momento.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8 py-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-5xl font-extrabold text-center mb-16 text-blue-700 dark:text-blue-400">Nosssa Coleção de Livros</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"> {/* Grid responsivo */}
        {books.map((book) => (
          <div key={book.id} className="
            bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-gray-800/50 
            overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105
            border border-gray-200 dark:border-gray-700
          ">
            <div className="relative w-full h-72">
              <Image
                src={book.image}
                alt={book.title}
                fill={true}
                className="rounded-t-xl"
                priority={book.id === '1'}
              />
            </div>
            <div className="p-6 flex-grow flex flex-col"> 
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 leading-tight line-clamp-2">
                {book.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">
                {book.author}
              </p>
              <p className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-4">
                R$ {book.price.toFixed(2)}
              </p>
              <Link
                href={`/books/${book.id}`}
                className="
                  mt-auto block text-center 
                  bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                  text-white font-semibold py-3 px-6 rounded-lg 
                  transition-colors duration-200 shadow-md hover:shadow-lg
                "
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}