import React from 'react';

const Success = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f8ff',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '30px 50px',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            color: '#28a745',
            marginBottom: '20px',
          }}
        >
          🎉
        </div>
        <h1
          style={{
            fontSize: '32px',
            color: '#333333',
            marginBottom: '10px',
          }}
        >
          Success!
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#666666',
            marginBottom: '20px',
          }}
        >
          Your operation was completed successfully. Thank you for using our service!
        </p>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            color: '#ffffff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
