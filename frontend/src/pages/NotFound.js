import React from 'react';
import { motion } from 'framer-motion'; // Import for animations
import { Link } from 'react-router-dom'; // To navigate back to home
import './NotFound.css'; // Include custom CSS for styling

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}
    >
      <img
        src="/assets/not-found.svg" // Replace with an actual image path
        alt="Page Not Found"
        style={{ maxWidth: '300px', marginBottom: '20px' }}
      />
      <h1 style={{ fontSize: '2.5rem', color: '#333' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '10px' }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back to Home
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default NotFound;
