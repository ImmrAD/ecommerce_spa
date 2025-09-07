import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { token, logout } = useAuth();
  const { getCartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false); // State for the mobile menu

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ADverse
        </Link>
        
        {/* Hamburger Button for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-lg text-gray-700 hover:text-blue-600">Products</Link>
          <Link to="/cart" className="text-lg text-gray-700 hover:text-blue-600">Cart ({getCartCount()})</Link>
          {token ? (
            <button onClick={logout} className="text-lg text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-lg text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-lg text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">Sign Up</Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu (conditionally rendered) */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <Link to="/" className="block text-lg text-gray-700 py-2" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/cart" className="block text-lg text-gray-700 py-2" onClick={() => setIsOpen(false)}>Cart ({getCartCount()})</Link>
          {token ? (
            <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left text-lg text-red-500 py-2">Logout</button>
          ) : (
            <>
              <Link to="/login" className="block text-lg text-gray-700 py-2" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" className="block text-lg text-gray-700 py-2" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}