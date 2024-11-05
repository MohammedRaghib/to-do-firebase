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
  const [currentEditTodo, setCurrentEditTodo] = useState(null); // Track the to-do being edited

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

  const handleEditClick = (todo) => {
    setCurrentEditTodo(todo); // Enter edit mode for selected to-do
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    if (currentEditTodo) {
      await updateTodo(currentEditTodo.id, currentEditTodo);
      setCurrentEditTodo(null); // Exit edit mode
    }
  };

  const cancelEdit = () => {
    setCurrentEditTodo(null); // Cancel edit mode
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage To-Dos</h2>
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          required
          className="border border-gray-300 rounded-lg p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          required
          className="border border-gray-300 rounded-lg p-2 mr-2"
        />
        <input
          type="date"
          value={newTodo.dueDate}
          onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          required
          className="border border-gray-300 rounded-lg p-2 mr-2"
        />
        <select
          value={newTodo.category}
          onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
          required
          className="border border-gray-300 rounded-lg p-2 mr-2"
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
          className="border border-gray-300 rounded-lg p-2 mr-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label className="mr-1">
          Completed
          <input
            type="checkbox"
            checked={newTodo.completed}
            onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
            className="ml-2"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 ml-10">
          Add To-Do
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-white rounded-lg shadow-lg p-4">
            {currentEditTodo && currentEditTodo.id === todo.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={currentEditTodo.title}
                  onChange={handleEditChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  name="description"
                  value={currentEditTodo.description}
                  onChange={handleEditChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={currentEditTodo.dueDate}
                  onChange={handleEditChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                />
                <select
                  name="category"
                  value={currentEditTodo.category}
                  onChange={handleEditChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  name="priority"
                  value={currentEditTodo.priority}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="flex justify-between">
                  <button onClick={saveEdit} className="bg-green-500 text-white rounded-lg p-2">
                    Save
                  </button>
                  <button onClick={cancelEdit} className="bg-red-500 text-white rounded-lg p-2">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold text-lg">{todo.title}</h3>
                <p className="text-gray-600">{todo.description}</p>
                <p className="text-gray-500">Due: {todo.dueDate}</p>
                <p className="text-gray-500">Category: {todo.category}</p>
                <p className="text-gray-500">Priority: {todo.priority}</p>
                <p className="text-gray-500">Completed: {todo.completed ? 'Yes' : 'No'}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => updateTodo(todo.id, { ...todo, completed: !todo.completed })}
                    className="bg-yellow-500 text-white rounded-lg p-2"
                  >
                    Toggle Complete
                  </button>
                  <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white rounded-lg p-2">
                    Delete
                  </button>
                  <button onClick={() => handleEditClick(todo)} className="bg-blue-500 text-white rounded-lg p-2">
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoManager;
