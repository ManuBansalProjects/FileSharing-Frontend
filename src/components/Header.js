import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
    width : '98%'
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#333',
    cursor : 'pointer',
  },
  link:{
    textDecoration : 'none'
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 16px',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
  },
  upload: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  profile: {
    backgroundColor: '#6c757d',
    color: 'white',
  },
};

function Header() {
  return (
    <header className="header" style={styles.header}>
      <Link to='/dashboard' style={styles.link}><h2 style={styles.title}>Dashboard</h2></Link>
      <nav style={styles.actions}>
        <Link to="/upload-file" style={{ ...styles.button, ...styles.upload }}>
          + Upload File
        </Link>
        <Link to="/profile" style={{ ...styles.button, ...styles.profile }}>
          My Profile
        </Link>
      </nav>
    </header>
  );
}

export default Header;
