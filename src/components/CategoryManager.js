// src/components/CategoryManager.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const fetchCategories = async () => {
    const categoriesCollection = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoriesCollection);
    const categoryList = categorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCategories(categoryList);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      await addDoc(collection(db, 'categories'), { name: newCategory });
      setNewCategory('');
      fetchCategories();
    }
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, 'categories', id));
    fetchCategories();
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={addCategory}>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => deleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
