import { createContext, useState, useEffect, useContext, type ReactNode, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // We need to know if the user is logged in

// We need a more detailed type now that we get populated product data
interface CartItem {
  _id: string; // This is the cart item's ID, not used much
  productId: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

  const API_URL = 'https://ecommerce-spa-55m5.onrender.com/api/cart';

  // Function to fetch the cart from the backend
  const fetchCart = useCallback(async () => {
    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data?.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCart([]); // Clear cart on error
    } finally {
      setLoading(false);
    }
  }, [token]);

  // useEffect to fetch cart when user logs in/out (token changes)
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const response = await axios.post(API_URL, 
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.items);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.items);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };
  
  const clearCart = async () => {
    try {
      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart, getCartCount }}>
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