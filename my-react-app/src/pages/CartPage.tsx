import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  // 1. Get all the necessary functions and states from the context
  const { cart, loading, addToCart, removeFromCart, clearCart } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  // 2. Update calculateTotal to use the nested productId.price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    clearCart();
    setIsCheckedOut(true);
  };
  
  // 3. Add a loading state while fetching the cart from the database
  if (loading) {
    return <div className="text-center p-10 text-xl">Loading your cart...</div>;
  }

  if (isCheckedOut) {
    return (
      <div className="text-center p-10">
        <h1 className="text-4xl font-bold text-green-600">Thanks for shopping!</h1>
        <p className="mt-4 text-lg">Your order has been placed.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
        <p className="mt-4">Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {cart.map(item => (
          // 4. Update the mapping to use the nested productId object for details
          <div key={item.productId._id} className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center">
              <img src={item.productId.imageUrl} alt={item.productId.name} className="w-20 h-20 object-cover rounded mr-4" />
              <div>
                <p className="font-bold text-lg">{item.productId.name}</p>
                <p className="text-gray-600">${item.productId.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={() => removeFromCart(item.productId._id)} className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-l">-</button>
              <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
              {/* The '+' button logic is more complex now, so it's removed for simplicity. 
                  Users can add more from the main page. */}
              <button onClick={() => addToCart(item.productId._id, 1)} className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-r">+</button>
            </div>
          </div>
        ))}
        <div className="text-right mt-6">
          <h2 className="text-2xl font-bold">Total: ${calculateTotal()}</h2>
          <button onClick={handleCheckout} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}