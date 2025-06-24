import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page'; 
import '@testing-library/jest-dom';
import { Book } from '@/types'; 

// Mock dos dados dos livros
const mockBooks: Book[] = [
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
];

// Mock global para a função fetch
// Isso é necessário porque o `HomePage` é um Server Component que faz `fetch`
beforeAll(() => {
  jest.spyOn(global, 'fetch').mockImplementation((input: RequestInfo | URL, init?: RequestInit | undefined) => {
    if (input.toString().includes('/books.json')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBooks),
      } as Response);
    }
    return Promise.reject(new Error('fetch not mocked for this URL'));
  });
});

afterAll(() => {
  jest.restoreAllMocks(); 
});

describe('HomePage', () => {
  it('should render the main heading', async () => {
    render(await HomePage());
    expect(screen.getByRole('heading', { level: 1, name: /Nossa Coleção de Livros/i })).toBeInTheDocument();
  });

  it('should display a list of books fetched from the API', async () => {
    render(await HomePage());
    expect(screen.getByText('Livro Teste 1')).toBeInTheDocument();
    expect(screen.getByText('Autor Teste 1')).toBeInTheDocument();
    expect(screen.getByText('R$ 10.00')).toBeInTheDocument();

    expect(screen.getByText('Livro Teste 2')).toBeInTheDocument();
    expect(screen.getByText('Autor Teste 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 20.00')).toBeInTheDocument();

    
    expect(global.fetch).toHaveBeenCalled();
    const allFetchCalls = (global.fetch as jest.Mock).mock.calls;
    const booksApiCall = allFetchCalls.find(call =>
      call[0].toString() === 'http://localhost:3000/books.json'
    );
    expect(booksApiCall).toBeDefined();
  });

  it('should display "Nenhum livro encontrado" if no books are fetched', async () => {
    
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)
    );

    render(await HomePage());
    expect(screen.getByText('Nenhum livro encontrado no momento.')).toBeInTheDocument();
    expect(screen.queryByText('Livro Teste 1')).not.toBeInTheDocument(); 
  });

  it('should have a link to the details page for each book', async () => {
    render(await HomePage());
    const links = screen.getAllByRole('link', { name: /Ver Detalhes/i });
    expect(links.length).toBe(mockBooks.length);
    expect(links[0]).toHaveAttribute('href', '/books/1');
    expect(links[1]).toHaveAttribute('href', '/books/2');
  });
});