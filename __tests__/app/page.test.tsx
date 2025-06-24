import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page'; 
import '@testing-library/jest-dom';
import fs from 'fs/promises'

// Mock dos dados dos livros
const mockBooksContent = JSON.stringify([
  {
    id: '1',
    title: 'Livro Teste 1',
    author: 'Autor Teste 1',
    price: 10.00,
    image: '/images/book1.jpg',
    description: 'Descrição do livro 1.'
  },
  {
    id: '2',
    title: 'Livro Teste 2',
    author: 'Autor Teste 2',
    price: 20.00,
    image: '/images/book2.jpg',
    description: 'Descrição do livro 2.'
  },
])


// Mock global para a função fetch
// Isso é necessário porque o `HomePage` é um Server Component que faz `fetch`
jest.mock('fs/promises', () => ({
  // Mocque apenas readFile. Outras funções como writeFile, mkdir, etc., serão mocks vazios se não definidas aqui.
  readFile: jest.fn((filePath: string, encoding: string) => {
    // Você pode verificar o 'filePath' se tiver vários arquivos sendo lidos
    if (filePath.includes('public/books.json') || filePath.endsWith('books.json')) {
      return Promise.resolve(mockBooksContent);
    }
    // Para outros arquivos, você pode retornar um erro ou um conteúdo vazio
    return Promise.reject(new Error(`Arquivo não mockado para teste: ${filePath}`));
  }),
  // Você pode adicionar outras funções de 'fs/promises' se seu código as usar e precisar que sejam mockadas
}));

afterAll(() => {
  jest.restoreAllMocks(); 
});

describe('HomePage', () => {
  it('should render the main heading', async () => {
    render(await HomePage());
    expect(screen.getByRole('heading', { level: 1, name: /Nossa Coleção de Livros/i })).toBeInTheDocument();
  });

  it('should display a list of books', async () => {
    render(await HomePage());
    expect(screen.getByText('Livro Teste 1')).toBeInTheDocument();
    expect(screen.getByText('Autor Teste 1')).toBeInTheDocument();
    expect(screen.getByText('R$ 10.00')).toBeInTheDocument();

    expect(screen.getByText('Livro Teste 2')).toBeInTheDocument();
    expect(screen.getByText('Autor Teste 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 20.00')).toBeInTheDocument();

  });

  it('should display "Nenhum livro encontrado" if no books', async () => {
    // 1. Acessar o mock de fs.readFile
    const mockReadFileSync = fs.readFile as jest.Mock;

    // 2. Mockar a implementação de fs.readFile UMA VEZ
    // para que ele retorne uma string de JSON vazia.
    // Isso simula que o arquivo books.json está vazio ou não tem livros.
    mockReadFileSync.mockImplementationOnce((filePath: string, encoding: string) => {
      // É importante que o filePath ainda corresponda ao que getBook tenta ler
      // (ex: 'public/books.json' ou o caminho mockado por path.join se você o mockou)
      if (filePath.includes('public/books.json') || filePath.endsWith('books.json')) {
        return Promise.resolve(JSON.stringify([])); // Retorna um array JSON vazio em formato de string
      }
      // Se sua função getBook tentar ler outros arquivos, adicione um fallback adequado aqui.
      return Promise.reject(new Error(`File not found for testing: ${filePath}`));
    });

    // 3. Renderizar a HomePage (que chamará getBook, que por sua vez chamará fs.readFile)
    render(await HomePage());

    // 4. Validar as expectativas
    expect(screen.getByText('Nenhum livro encontrado no momento.')).toBeInTheDocument();
    expect(screen.queryByText('Livro Teste 1')).not.toBeInTheDocument(); // Certifique-se de que nenhum livro seja exibido
  });

  it('should have a link to the details page for each book', async () => {
    render(await HomePage());
    const links = screen.getAllByRole('link', { name: /Ver Detalhes/i });
    
    expect(links[0]).toHaveAttribute('href', '/books/1');
    expect(links[1]).toHaveAttribute('href', '/books/2');
  });
});