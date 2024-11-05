import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function CadastrarCidade() {
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaCidade = { nome, estado, pais };

    try {
      await axios.post('http://localhost:8080/api/cidades', novaCidade);
      alert('Cidade cadastrada com sucesso!');
      navigate('/cidades');
    } catch (error) {
      console.error("Erro ao cadastrar cidade:", error);
      alert('Erro ao cadastrar cidade. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" style={{ color: '#FF6B6B', fontWeight: 'bold', marginBottom: '30px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#FF6B6B' }}>HotelHub</Link>
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Estado"
          variant="outlined"
          fullWidth
          required
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="País"
          variant="outlined"
          fullWidth
          required
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button type="submit" variant="contained" style={{ backgroundColor: '#FF6B6B', color: '#FFFFFF' }}>
          Cadastrar Cidade
        </Button>
      </form>
    </Container>
  );
}

export default CadastrarCidade;