// contexts/CartContext.tsx
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product } from '@/types/types';
import { useToggle } from 'react-use';
import { EmptyStatement } from 'typescript';

export type CartItem = {
  product: Product;
  quantity: number;
};



interface CartContextProps {
  cartItems: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  isOpen: boolean,
  toggle: () => void, 
  totalPrice: number
  totalItemsInCart: number


}

const initialState: CartItem[]  = []


const CartContext = createContext<CartContextProps>({
  cartItems: initialState,
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
  isOpen: false,
  toggle: () => {},
  totalPrice: 0,
  totalItemsInCart: 0,
});

interface CardProviderProps {
  children: React.ReactNode
}



export const CartProvider: React.FC<CardProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialState);
  const [isOpen, toggle] = useToggle(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems !== initialState) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

 
  const addItem = (product: Product, quantity: number) => {
    
    const existingItem = cartItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      updateItemQuantity(product.id, existingItem.quantity + quantity);
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
  };

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const updateItemQuantity = (productId: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateItemQuantity, clearCart, isOpen, toggle, totalPrice, totalItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
