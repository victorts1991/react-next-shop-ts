'use client'; // Necessário para usar React Context e Redux Provider
import { Provider } from 'react-redux';
import { store } from '@/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}