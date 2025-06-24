import '@testing-library/jest-dom'

process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000'; 

const mockLocalStorageStore: { [key: string]: string } = {};

const mockLocalStorage = {
  getItem: jest.fn((key: string) => {
    return mockLocalStorageStore[key] || null;
  }),
  setItem: jest.fn((key: string, value: string) => {
    mockLocalStorageStore[key] = value;
  }),
  removeItem: jest.fn((key: string) => {
    delete mockLocalStorageStore[key];
  }),
  clear: jest.fn(() => {
    Object.keys(mockLocalStorageStore).forEach(key => delete mockLocalStorageStore[key]);
  }),
};

Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: mockLocalStorage,
});

beforeAll(() => {
    

});

afterAll(() => {
    jest.restoreAllMocks(); 
});

global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit | undefined) => {
  
  if (input.toString().includes('/books.json')) {
    return Promise.resolve({
      ok: true, 
      json: () => Promise.resolve([ 
        { id: '1', title: 'Livro Mockado 1', author: 'Autor Mockado 1', price: 10.00, image: '/images/book1.jpg', description: '...' },
        { id: '2', title: 'Livro Mockado 2', author: 'Autor Mockado 2', price: 20.00, image: '/images/book2.jpg', description: '...' },
      ]),
    } as Response)
  }

  
  
  return Promise.reject(new Error(`Fetch not mocked for URL: ${input.toString()}`))
});


global.alert = jest.fn();
