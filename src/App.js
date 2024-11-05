import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ToDoManager from './components/ToDoManager';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryManager from './components/CategoryManager';
import Register from './components/Register';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  const [user, setUser] = useState(null); // Manage user state

  const handleLogin = (userData) => {
    setUser(userData); // Set user data on successful login
  };

  const handleLogout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div>
                <Link to="/" className="text-white font-bold text-xl">Me.ToDo</Link>
              </div>
              <div>
                <Link to="/" className="text-white px-4">Home</Link>

                {user ? (
                  <>
                    <Link to="/todos" className="text-white px-4">To Do Manager</Link>
                    <Link to="/categories" className="text-white px-4">Categories Manager</Link>
                    <Link to="/profile" className="text-white px-4">Profile</Link>
                    <Link to="/logout" className="text-white px-4">Logout</Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-white px-4">Login</Link>
                    <Link to="/register" className="text-white px-4">Register</Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<h1 className="text-center text-2xl">Welcome to My To-Do App</h1>} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
              <Route path="/profile" element={user ? <Profile user={user} /> : <h1>Please log in</h1>} />
              
              {/* Use ProtectedRoute for the routes that require authentication */}
              <Route 
                path="/todos" 
                element={
                  <ProtectedRoute isAuthenticated={!!user}>
                    <ToDoManager />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories" 
                element={
                  <ProtectedRoute isAuthenticated={!!user}>
                    <CategoryManager />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
