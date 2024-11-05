// src/components/Profile.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  
  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {currentUser?.email}</p>
      <p>Verified: {currentUser?.emailVerified ? "Yes" : "No"}</p>
    </div>
  );
};

export default Profile;
