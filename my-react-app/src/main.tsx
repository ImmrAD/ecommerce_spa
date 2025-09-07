import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';

// Page Components
import HomePage from './pages/HomePage.tsx';
import CartPage from './pages/CartPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';

// This is the router configuration.
// The 'cart' path is a child of the main '/' path.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The main layout (App.tsx) wraps all pages
    children: [
      {
        index: true, // This is the default page at '/'
        element: <HomePage />,
      },
      {
        path: 'cart', // This matches the '/cart' URL
        element: <CartPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);