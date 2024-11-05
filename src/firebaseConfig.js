// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDiw0lFO6FAy5NpCJBik0v_6f0VTIOFk3g",
  authDomain: "todo-app-f04d7.firebaseapp.com",
  projectId: "todo-app-f04d7",
  storageBucket: "todo-app-f04d7.appspot.com",
  messagingSenderId: "1059314973057",
  appId: "1:1059314973057:web:00da2ba60ec1e8a6831080",
  measurementId: "G-HT7X9H2NRG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export auth and firestore instances
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
