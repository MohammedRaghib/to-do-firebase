// src/components/ToDoManager.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const ToDoManager = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
    priority: 'low',
    completed: false,
  });

  const fetchTodos = async () => {
    const todosCollection = collection(db, 'todos');
    const todoSnapshot = await getDocs(todosCollection);
    const todoList = todoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTodos(todoList);
  };

  const fetchCategories = async () => {
    const categoriesCollection = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoriesCollection);
    const categoryList = categorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCategories(categoryList);
  };

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'todos'), newTodo);
    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      category: '',
      priority: 'low',
      completed: false,
    });
    fetchTodos();
  };

  const updateTodo = async (id, updatedData) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, updatedData);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    fetchTodos();
  };

  return (
    <div>
      <h2>Manage To-Dos</h2>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={newTodo.dueDate}
          onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          required
        />
        <select
          value={newTodo.category}
          onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={newTodo.priority}
          onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label>
          Completed
          <input
            type="checkbox"
            checked={newTodo.completed}
            onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
          />
        </label>
        <button type="submit">Add To-Do</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Due: {todo.dueDate}</p>
            <p>Category: {todo.category}</p>
            <p>Priority: {todo.priority}</p>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
            <button onClick={() => updateTodo(todo.id, { ...todo, completed: !todo.completed })}>
              Toggle Complete
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoManager;
