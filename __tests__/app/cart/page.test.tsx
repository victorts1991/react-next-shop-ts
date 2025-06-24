'use client';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartPage from '@/app/cart/page';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from '@/store/cartSlice';
import { Book } from '@/types';
import '@testing-library/jest-dom';

const mockBook1: Book = { id: '1', title: 'Livro A', author: 'Autor A', price: 10, image: '/images/a.jpg', description: '' };
const mockBook2: Book = { id: '2', title: 'Livro B', author: 'Autor B', price: 20, image: '/images/b.jpg', description: '' };

// Função utilitária para configurar uma store Redux com itens pré-carregados
const setupStoreWithItems = () => {
  const store = configureStore({ reducer: { cart: cartReducer } });
  act(() => { 
    store.dispatch(addToCart(mockBook1));
    store.dispatch(addToCart(mockBook1)); 
    store.dispatch(addToCart(mockBook2)); 
  });
  return store;
};

describe('CartPage', () => {
  it('should display "Seu carrinho está vazio" when cart is empty', () => {
    const store = configureStore({ reducer: { cart: cartReducer } }); 
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );
    expect(screen.getByText('Seu carrinho está vazio.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Voltar para a Loja/i })).toBeInTheDocument();
  });

  it('should display cart items and total correctly', () => {
    const store = setupStoreWithItems();
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText('Livro A')).toBeInTheDocument();
    expect(screen.getByText('Livro B')).toBeInTheDocument();
    expect(screen.getByText('Total: R$ 40.00')).toBeInTheDocument(); // 10*2 + 20*1 = 40
  });

  it('should update quantity when +/- buttons are clicked', async () => {
    const store = setupStoreWithItems();
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    // Aumentar quantidade do Livro A (botão + correspondente)
    const plusButtonA = screen.getByRole('button', { name: `Aumentar quantidade de ${mockBook1.title}` });
    await user.click(plusButtonA);
    expect(screen.getByText('Total: R$ 50.00')).toBeInTheDocument(); // 10*3 + 20*1 = 50

    // Diminuir quantidade do Livro A (botão - correspondente)
    const minusButtonA = screen.getByRole('button', { name: `Diminuir quantidade de ${mockBook1.title}` });
    await user.click(minusButtonA);
    expect(screen.getByText('Total: R$ 40.00')).toBeInTheDocument();
  });

  it('should remove item when "Remover" button is clicked', async () => {
    const store = setupStoreWithItems();
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    // Remover Livro A
    const removeButtonA = screen.getByRole('button', { name: `Remover ${mockBook1.title} do carrinho` });
    await user.click(removeButtonA);

    expect(screen.queryByText('Livro A')).not.toBeInTheDocument(); // Livro A deve ter sumido
    expect(screen.getByText('Livro B')).toBeInTheDocument(); // Livro B deve permanecer
    expect(screen.getByText('Total: R$ 20.00')).toBeInTheDocument(); // Apenas Livro B permanece
  });
});