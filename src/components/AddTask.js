// src/components/AddTask.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';

const AddTask = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    await db.collection('ToDo').add({
      title,
      description,
      category,
      dueDate,
      completed,
      userId,
    });
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleAddTask}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
      <label>
        Completed: 
        <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
