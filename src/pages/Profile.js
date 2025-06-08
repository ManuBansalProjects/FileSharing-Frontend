import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as UserService from '../services/userServices';

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    fontFamily: 'sans-serif',
  },
  heading: {
    marginBottom: '24px',
    fontSize: '24px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '16px',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};


function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);

  const handleUpdate = async() => {
    try {
        const response = await UserService.UpdateProfile({name});    
        
        const user = JSON.parse(localStorage.getItem('user'));
        user.name = name;
        localStorage.setItem('user', JSON.stringify(user));

        alert('Profile updated!');
    } catch (error) {
        
    }
  };

  const logOut=()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Email</label>
        <input type="email" value={email} disabled style={{ ...styles.input, backgroundColor: '#f1f1f1' }} />
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={handleUpdate} style={styles.primaryButton}>
          Update Profile
        </button>
        <button onClick={() => navigate('/change-password')} style={styles.secondaryButton}>
          Change Password
        </button>
        <button onClick={logOut} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>

  );
}

export default Profile;
