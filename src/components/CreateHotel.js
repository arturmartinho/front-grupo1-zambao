import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { createHotel } from '../api';

const CreateHotel = () => {
  const [hotelData, setHotelData] = useState({
    nome: '',
    endereco: '',
    capacidade: '',
    precoDiaria: '',
    cidade: '',
  });

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHotel(hotelData);
      alert("Hotel cadastrado com sucesso!");
      setHotelData({ nome: '', endereco: '', capacidade: '', precoDiaria: '', cidade: '' });
    } catch (error) {
      alert("Erro ao cadastrar o hotel!");
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        HotelHub
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nome" name="nome" value={hotelData.nome} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Endereço" name="endereco" value={hotelData.endereco} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Capacidade" name="capacidade" value={hotelData.capacidade} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Preço por diária" name="precoDiaria" value={hotelData.precoDiaria} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Cidade" name="cidade" value={hotelData.cidade} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar Hotel
        </Button>
      </form>
    </Container>
  );
};

export default CreateHotel;
