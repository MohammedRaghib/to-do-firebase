// src/components/ToDoList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import ToDoItem from './ToDoItem';

const ToDoList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('ToDo')
      .where('userId', '==', userId)
      .onSnapshot(snapshot => {
        setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return unsubscribe;
  }, [userId]);

  return (
    <div>
      {tasks.map(task => (
        <ToDoItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ToDoList;
