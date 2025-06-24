'use client';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import '@testing-library/jest-dom';

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


function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-status">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear(); 
    jest.clearAllMocks(); 
  });

  it('should provide default "light" theme if nothing in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    expect(document.documentElement).not.toHaveClass('dark'); 
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
  });

  it('should load theme from localStorage on mount', () => {
    localStorageMock.setItem('theme', 'dark'); 
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
  });

  it('should toggle theme and update localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /Toggle Theme/i });

    // Toggle para dark
    await user.click(toggleButton);
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');

    // Toggle para light
    await user.click(toggleButton);
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});