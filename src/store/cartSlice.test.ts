import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from './cartSlice';
import { Book } from '@/types';

const mockBook1: Book = { id: '1', title: 'Livro 1', author: 'Autor 1', price: 10, image: '', description: '' };
const mockBook2: Book = { id: '2', title: 'Livro 2', author: 'Autor 2', price: 20, image: '', description: '' };

describe('cartSlice', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle addToCart for a new item', () => {
    const state = cartReducer(undefined, addToCart(mockBook1));
    expect(state.items).toEqual([{ ...mockBook1, quantity: 1 }]);
  });

  it('should handle addToCart for an existing item', () => {
    let state = cartReducer(undefined, addToCart(mockBook1));
    state = cartReducer(state, addToCart(mockBook1));
    expect(state.items).toEqual([{ ...mockBook1, quantity: 2 }]);
  });

  it('should handle removeFromCart', () => {
    let state = cartReducer(undefined, addToCart(mockBook1));
    state = cartReducer(state, addToCart(mockBook2));
    state = cartReducer(state, removeFromCart('1'));
    expect(state.items).toEqual([{ ...mockBook2, quantity: 1 }]);
  });

  it('should handle updateQuantity for an existing item', () => {
    let state = cartReducer(undefined, addToCart(mockBook1)); 
    state = cartReducer(state, updateQuantity({ id: '1', quantity: 3 }));
    expect(state.items).toEqual([{ ...mockBook1, quantity: 3 }]);
  });

  it('should remove item when updateQuantity sets quantity to 0', () => {
    let state = cartReducer(undefined, addToCart(mockBook1));
    state = cartReducer(state, updateQuantity({ id: '1', quantity: 0 }));
    expect(state.items).toEqual([]);
  });

  it('should handle clearCart', () => {
    let state = cartReducer(undefined, addToCart(mockBook1));
    state = cartReducer(state, addToCart(mockBook2));
    state = cartReducer(state, clearCart());
    expect(state.items).toEqual([]);
  });
});