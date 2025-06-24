'use client'; // Componente cliente
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useTheme } from '@/providers/ThemeProvider'; 
import { FaShoppingCart, FaSun, FaMoon } from 'react-icons/fa'; // Instale react-icons: npm install react-icons

export default function Navbar() {
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
        {/* Adicionei de volta o 'mb-4' aqui para mobile */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight hover:opacity-90 transition-opacity mb-4 sm:mb-0">
          NextBookStore
        </Link>
        <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
          <Link href="/cart" className="relative text-lg font-medium hover:underline flex items-center">
            <FaShoppingCart className="mr-2 text-xl" />
            Carrinho ({cartItemCount})
          </Link>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-blue-700 dark:bg-gray-800 hover:bg-blue-800 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
            aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            {theme === 'light' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl text-yellow-300" />}
          </button>
        </div>
      </div>
    </nav>
  );
}