import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cidades from './pages/Cidades';
import Hoteis from './pages/Hoteis';
import Reservas from './pages/Reservas';
import CadastrarCidade from './pages/CadastrarCidade';
import CadastrarHotel from './pages/CadastrarHotel';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cidades" element={<Cidades />} />
          <Route path="/cadastrar-cidade" element={<CadastrarCidade />} />
          <Route path="/cadastrar-hotel" element={<CadastrarHotel />} />
          <Route path="/hoteis" element={<Hoteis />} />
          <Route path="/reservas" element={<Reservas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;