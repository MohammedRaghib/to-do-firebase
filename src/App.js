// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
// import ToDoList from './components/ToDoList';
import CategoryManager from './components/CategoryManager';
import ToDoManager from './components/ToDoManager';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* To-Do and Category Management */}
          {/* <Route path="/todo" element={<ToDoList />} /> */}
          <Route path="/categories" element={<CategoryManager />} />
          <Route path="/todos" element={<ToDoManager />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
