import React, { useState } from 'react';
import { db } from '../firebaseConfig';

const ToDoItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    category: task.category,
    dueDate: task.dueDate,
  });

  const handleDelete = async () => {
    await db.collection('ToDo').doc(task.id).delete();
  };

  const toggleComplete = async () => {
    await db.collection('ToDo').doc(task.id).update({ completed: !task.completed });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setEditedTask({
      title: task.title,
      description: task.description,
      category: task.category,
      dueDate: task.dueDate,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await db.collection('ToDo').doc(task.id).update(editedTask);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="category"
            value={editedTask.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            placeholder="Due Date"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.category}</p>
          <p>Due: {task.dueDate}</p>
          <label>
            <input type="checkbox" checked={task.completed} onChange={toggleComplete} />
            Completed
          </label>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEditToggle}>Edit</button>
        </>
      )}
    </div>
  );
};

export default ToDoItem;
