import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const { login, register } = useAuth(); // Destructure the login and register functions from the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and registration
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Hook to navigate programmatically

  const validateInput = () => {
    if (!email) {
      setError('Email is required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email format is invalid.');
      return false;
    }
    if (!password) {
      setError('Password is required.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError(''); // Clear error if all validations pass
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return; // Stop submission if validation fails

    try {
      if (isRegistering) {
        // Attempt to register
        const userData = await register(email, password);
        onLogin(userData); // Pass user data to the parent component
        navigate('/todos'); // Redirect to /todos on successful registration
      } else {
        // Attempt to login
        const userData = await login(email, password);
        onLogin(userData); // Pass user data to the parent component
        navigate('/todos'); // Redirect to /todos on successful login
      }
    } catch (error) {
      setError(`${isRegistering ? 'Registration' : 'Login'} failed: ${error.message}`);
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{isRegistering ? 'Register' : 'Login'}</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-blue-700 transition duration-200"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"} 
          <button 
            onClick={() => setIsRegistering(!isRegistering)} 
            className="text-blue-600 hover:underline ml-1"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
