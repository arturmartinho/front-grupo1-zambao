import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo ao Sistema de Gerenciamento de Hotéis e Cidades</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/cidades">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Gerenciar Cidades</button>
        </Link>
        <Link to="/hoteis">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Gerenciar Hotéis</button>
        </Link>
        <Link to="/reservas">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Ver Reservas</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;