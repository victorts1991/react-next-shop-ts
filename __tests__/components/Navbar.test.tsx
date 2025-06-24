'use client';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from '@/store/cartSlice';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Book } from '@/types';
import '@testing-library/jest-dom';

const mockBook: Book = { id: '1', title: 'Test Book', author: 'Test Author', price: 10, image: '', description: '' };

// Mock localStorage para o ThemeProvider
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value.toString(); }),
    clear: jest.fn(() => { store = {}; }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Função utilitária para renderizar o Navbar com todos os Providers necessários
const renderNavbar = (store: ReturnType<typeof configureStore>) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </Provider>
  );
};

describe('Navbar', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { cart: cartReducer } });
    localStorageMock.clear(); 
    jest.clearAllMocks(); 
  });

  it('should render the store name', () => {
    renderNavbar(store);
    expect(screen.getByText('NextBookStore')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'NextBookStore' })).toHaveAttribute('href', '/');
  });

  it('should display the correct cart item count', () => {
    renderNavbar(store);
    expect(screen.getByText('Carrinho (0)')).toBeInTheDocument();

    act(() => {
      store.dispatch(addToCart(mockBook));
    });
    expect(screen.getByText('Carrinho (1)')).toBeInTheDocument();

    act(() => {
      store.dispatch(addToCart(mockBook)); 
    });
    expect(screen.getByText('Carrinho (2)')).toBeInTheDocument();
  });

  it('should toggle theme when theme button is clicked', async () => {
    const user = userEvent.setup();
    renderNavbar(store);

    const themeButton = screen.getByRole('button', { name: /Alternar para tema escuro|Alternar para tema claro/i });

    // Tema inicial (light)
    expect(document.documentElement).not.toHaveClass('dark');
    expect(themeButton).toHaveAttribute('aria-label', 'Alternar para tema escuro');

    // Clica para alternar para dark
    await user.click(themeButton);
    expect(document.documentElement).toHaveClass('dark');
    expect(themeButton).toHaveAttribute('aria-label', 'Alternar para tema claro');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');

    // Clica para alternar para light novamente
    await user.click(themeButton);
    expect(document.documentElement).not.toHaveClass('dark');
    expect(themeButton).toHaveAttribute('aria-label', 'Alternar para tema escuro');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});