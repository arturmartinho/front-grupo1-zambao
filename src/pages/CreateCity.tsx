import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createCity } from '../services/cityService';

const CreateCity: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    estado: '',
    pais: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCity(formData);
      navigate('/cities');  
    } catch (error) {
      console.error("Erro ao criar cidade", error);
      alert("Não foi possível cadastrar a cidade. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Cadastro de Cidade</Typography>
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
          label="Estado"
          variant="outlined"
          fullWidth
          margin="normal"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        />
        <TextField
          label="País"
          variant="outlined"
          fullWidth
          margin="normal"
          name="pais"
          value={formData.pais}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Cadastrar Cidade
        </Button>
      </form>
    </Container>
  );
};

export default CreateCity;
