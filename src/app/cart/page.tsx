'use client'; // Componente cliente
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-10 text-blue-700 dark:text-blue-400">Seu Carrinho de Compras</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-16">
          <p className="text-2xl mb-4">Seu carrinho está vazio.</p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors">
            Voltar para a Loja
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm bg-white dark:bg-gray-800">
              <Image src={item.image} alt={item.title} width={100} height={150} className="object-cover rounded mr-6 flex-shrink-0" />
              <div className="flex-grow">
                <h2 className="text-xl md:text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Por: {item.author}</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-3 ml-auto">
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label={`Diminuir quantidade de ${item.title}`}
                >
                  -
                </button>
                <span className="text-xl font-medium text-gray-900 dark:text-gray-100">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label={`Aumentar quantidade de ${item.title}`}
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-4 bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors text-lg"
                  aria-label={`Remover ${item.title} do carrinho`}
                >
                  Remover
                </button>
              </div>
              <p className="text-2xl font-bold ml-8 text-gray-900 dark:text-gray-100">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="text-right mt-8 p-5 border-t-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg shadow-lg">
            <p className="text-4xl font-extrabold text-blue-700 dark:text-blue-400">Total: R$ {total.toFixed(2)}</p>
            <button className="mt-6 w-full bg-blue-600 dark:bg-blue-500 text-white py-4 rounded-lg text-2xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-md">
              Finalizar Compra (Não implementado)
            </button>
          </div>
        </div>
      )}
    </main>
  );
}