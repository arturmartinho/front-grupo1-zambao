import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function CadastrarHotel() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [precoPorDiaria, setPrecoPorDiaria] = useState('');
  const [cidadeId, setCidadeId] = useState('');
  const [cidades, setCidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cidades');
        setCidades(response.data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    };

    fetchCidades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoHotel = { nome, endereco, capacidade, precoPorDiaria, cidadeId };

    try {
      await axios.post('http://localhost:8080/api/hotels', novoHotel);
      alert('Hotel cadastrado com sucesso!');
      navigate('/hoteis');
    } catch (error) {
      console.error("Erro ao cadastrar hotel:", error);
      alert('Erro ao cadastrar hotel. Tente novamente.');
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
          label="Endereço"
          variant="outlined"
          fullWidth
          required
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Capacidade"
          variant="outlined"
          fullWidth
          required
          type="number"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Preço por Diária"
          variant="outlined"
          fullWidth
          required
          type="number"
          value={precoPorDiaria}
          onChange={(e) => setPrecoPorDiaria(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <FormControl fullWidth required style={{ marginBottom: '20px' }}>
          <InputLabel>Cidade</InputLabel>
          <Select
            value={cidadeId}
            onChange={(e) => setCidadeId(e.target.value)}
            label="Cidade"
          >
            {cidades.map((cidade) => (
              <MenuItem key={cidade.id} value={cidade.id}>
                {cidade.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" style={{ backgroundColor: '#FF6B6B', color: '#FFFFFF' }}>
          Cadastrar Hotel
        </Button>
      </form>
    </Container>
  );
}

export default CadastrarHotel;