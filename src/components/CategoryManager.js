import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const CategoryManager = () => {
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const fetchCategories = async () => {
    if (!currentUser) return;
    const categoriesCollection = collection(db, 'categories');
    const q = query(categoriesCollection, where('userId', '==', currentUser.uid));
    const categorySnapshot = await getDocs(q);
    const categoryList = categorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCategories(categoryList);
  };

  useEffect(() => {
    fetchCategories();
  }, [currentUser]);

  const addCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim() && currentUser) {
      await addDoc(collection(db, 'categories'), {
        name: newCategory,
        userId: currentUser.uid,
      });
      setNewCategory('');
      fetchCategories();
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    if (editCategoryName.trim() && editCategoryId) {
      const categoryRef = doc(db, 'categories', editCategoryId);
      await updateDoc(categoryRef, { name: editCategoryName });
      setEditCategoryId(null);
      setEditCategoryName('');
      fetchCategories();
    }
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, 'categories', id));
    fetchCategories();
  };

  const startEdit = (category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <form onSubmit={editCategoryId ? updateCategory : addCategory} className="mb-4 flex">
        <input
          type="text"
          placeholder={editCategoryId ? "Edit Category" : "New Category"}
          value={editCategoryId ? editCategoryName : newCategory}
          onChange={(e) => editCategoryId ? setEditCategoryName(e.target.value) : setNewCategory(e.target.value)}
          className="flex-grow border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition duration-200"
        >
          {editCategoryId ? 'Update Category' : 'Add Category'}
        </button>
      </form>
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center py-2">
            <span className="text-gray-800">{category.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => startEdit(category)}
                className="text-blue-600 hover:text-blue-800 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
