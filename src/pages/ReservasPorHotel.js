// src/pages/ReservasPorHotel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function ReservasPorHotel() {
  const [hoteis, setHoteis] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [hotelSelecionado, setHotelSelecionado] = useState('');

  useEffect(() => {
    const fetchHoteis = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hotels');
        setHoteis(response.data);
      } catch (error) {
        console.error("Erro ao buscar hotéis:", error);
      }
    };

    fetchHoteis();
  }, []);

  useEffect(() => {
    if (hotelSelecionado) {
      const fetchReservas = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/api/v1/reserva?idHotel=${hotelSelecionado}`);
          setReservas(response.data.content);
        } catch (error) {
          console.error("Erro ao buscar reservas:", error);
        }
      };

      fetchReservas();
    }
  }, [hotelSelecionado]);

  const handleHotelChange = (event) => {
    setHotelSelecionado(event.target.value);
    setReservas([]);
  };

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" style={{ color: '#FF6B6B', fontWeight: 'bold', marginBottom: '30px' }}>
        <a href="/" style={{ textDecoration: 'none', color: '#FF6B6B' }}>HotelHub</a>
      </Typography>

      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Selecionar Hotel</InputLabel>
        <Select value={hotelSelecionado} onChange={handleHotelChange} label="Selecionar Hotel">
          {hoteis.map((hotel) => (
            <MenuItem key={hotel.id} value={hotel.id}>
              {hotel.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {reservas.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID da Reserva</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Data da Reserva</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Nome do Usuário</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Valor Total</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Número de Diarias</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell>{reserva.id}</TableCell>
                  <TableCell>{reserva.data}</TableCell>
                  <TableCell>{reserva.usuario.nome}</TableCell>
                  <TableCell>{reserva.valorTotal}</TableCell>
                  <TableCell>{reserva.numeroDiaria}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          {hotelSelecionado ? 'Nenhuma reserva encontrada para este hotel.' : 'Selecione um hotel para ver as reservas.'}
        </Typography>
      )}
    </Container>
  );
}

export default ReservasPorHotel;