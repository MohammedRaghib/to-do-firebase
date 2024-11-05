// src/components/Logout.js
import React, { useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Adjust this path according to your project structure
import { signOut } from 'firebase/auth';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        onLogout(); // Call the onLogout prop to update the user state in App.js
      } catch (error) {
        console.error("Logout failed: ", error);
      }
    };

    handleLogout();
  }, [onLogout]);

  return (
    <div className="text-center">
      <h1 className="text-2xl">You have been logged out.</h1>
    </div>
  );
};

export default Logout;
