import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Get the login function from the context

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    setMessage('');
    try {
      const response = await axios.post('https://ecommerce-spa-55m5.onrender.com/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });

      // --- KEY CHANGES ARE HERE ---
      // 3. Get the token from the response
      const token = response.data.token;
      
      // 4. Use the context's login function to save the token
      login(token);

      // 5. Redirect to the homepage instead of the login page
      navigate('/'); 

    } catch (error) {
      console.error('Signup failed:', error);
      setMessage('Signup failed. User may already exist.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {/* ... (rest of the form remains the same) ... */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
        {message && <p className="text-center text-sm mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
}