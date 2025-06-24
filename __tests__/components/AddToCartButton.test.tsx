'use client';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddToCartButton from '@/components/AddToCartButton';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/cartSlice';
import { Book } from '@/types';
import '@testing-library/jest-dom';

global.alert = jest.fn();

const mockBook: Book = {
  id: '1',
  title: 'Livro Teste',
  author: 'Autor Teste',
  price: 15.00,
  image: '/images/test.jpg',
  description: 'Descrição do livro teste.'
};

// Função para configurar uma store Redux mockada para cada teste
const setupStore = () => configureStore({ reducer: { cart: cartReducer } });

describe('AddToCartButton', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('should render the button correctly', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <AddToCartButton book={mockBook} />
      </Provider>
    );
    expect(screen.getByRole('button', { name: /Adicionar ao Carrinho/i })).toBeInTheDocument();
  });

  it('should dispatch addToCart action and show alert when clicked', async () => {
    const store = setupStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AddToCartButton book={mockBook} />
      </Provider>
    );

    const addButton = screen.getByRole('button', { name: /Adicionar ao Carrinho/i });
    await user.click(addButton);

    // Verifica se a ação foi disparada (inspecionando o estado da store)
    const state = store.getState();
    expect(state.cart.items).toEqual([{ ...mockBook, quantity: 1 }]);
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith(`${mockBook.title} adicionado ao carrinho!`);
  });
});