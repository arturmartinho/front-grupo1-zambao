import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createHotel } from '../services/hotelService';

const CreateHotel: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    capacidade: 0,
    precoPorDiaria: 0,
    cidadeId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'capacidade' || name === 'precoPorDiaria' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createHotel(formData);
      navigate('/');  
    } catch (error) {
      console.error("Erro ao criar hotel", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Cadastro de Hotel</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <TextField
          label="Endereço"
          variant="outlined"
          fullWidth
          margin="normal"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
        />
        <TextField
          label="Capacidade"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          name="capacidade"
          value={formData.capacidade}
          onChange={handleChange}
        />
        <TextField
          label="Preço por Diária"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          name="precoPorDiaria"
          value={formData.precoPorDiaria}
          onChange={handleChange}
        />
        <TextField
          label="ID da Cidade"
          variant="outlined"
          fullWidth
          margin="normal"
          name="cidadeId"
          value={formData.cidadeId}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Cadastrar Hotel
        </Button>
      </form>
    </Container>
  );
};

export default CreateHotel;
