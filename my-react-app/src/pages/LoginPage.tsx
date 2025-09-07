import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('https://ecommerce-spa-55m5.onrender.com/api/auth/login', {
        email,
        password,
      });

      login(response.data.token);
      navigate('/');

    } catch (error) {
      console.error('Login failed:', error);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
  <div className="max-w-md mx-4 sm:mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </form>
    </div>
  );
}