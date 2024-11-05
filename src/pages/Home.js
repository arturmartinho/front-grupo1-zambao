import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Bem-vindo ao Sistema de Gerenciamento de Hotéis e Cidades</h1>
        <p style={styles.subtitle}>Gerencie suas cidades, hotéis e reservas de forma fácil e intuitiva</p>
      </div>
      <div style={styles.buttonContainer}>
        <Link to="/cidades">
          <button style={styles.button}>Gerenciar Cidades</button>
        </Link>
        <Link to="/hoteis">
          <button style={styles.button}>Gerenciar Hotéis</button>
        </Link>
        <Link to="/reservas">
          <button style={styles.button}>Ver Reservas</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
    color: '#FFFFFF',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: '1.2em',
    marginTop: '10px',
    opacity: '0.9',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1em',
    color: '#FF6B6B',
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
  },
};

export default Home;
