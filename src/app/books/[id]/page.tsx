import Image from 'next/image';
import { Book } from '@/types';
import AddToCartButton from '@/components/AddToCartButton'; 


// Importe os módulos Node.js para acesso ao sistema de arquivos
import fs from 'fs/promises'; // Para ler arquivos assincronamente
import path from 'path';     // Para construir caminhos de arquivo de forma segura

// Esta função agora lerá o JSON diretamente do disco durante o build/render no servidor
async function getBook(id?: string): Promise<Book | undefined> {
  // Constrói o caminho absoluto para 'public/books.json' a partir da raiz do projeto
  // process.cwd() é o diretório de trabalho atual (raiz do projeto no Vercel build)
  const filePath = path.join(process.cwd(), 'public', 'books.json');
  
  console.log('DEBUG: Tentando ler livros de:', filePath); // Para depuração no log do Vercel

  try {
    // Lê o conteúdo do arquivo
    const fileContents = await fs.readFile(filePath, 'utf8');
    // Faz o parse do JSON
    const books: Book[] = JSON.parse(fileContents);

    // Ajuste a lógica de retorno:
    // Se 'id' é fornecido, encontra o livro. Se não, retorna o primeiro (para a página Home)
    return id ? books.find(book => book.id === id) : books[0];
  } catch (error) {
    console.error('Failed to read books.json directly from file system:', error);
    return undefined;
  }
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
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