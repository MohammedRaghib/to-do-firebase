// src/components/ToDoItem.js
import React from 'react';
import { db } from '../firebaseConfig';

const ToDoItem = ({ task }) => {
  const handleDelete = async () => {
    await db.collection('ToDo').doc(task.id).delete();
  };

  const toggleComplete = async () => {
    await db.collection('ToDo').doc(task.id).update({ completed: !task.completed });
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.category}</p>
      <p>Due: {task.dueDate}</p>
      <label>
        <input type="checkbox" checked={task.completed} onChange={toggleComplete} />
        Completed
      </label>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ToDoItem;
