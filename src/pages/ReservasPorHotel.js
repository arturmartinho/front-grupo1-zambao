import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';

function ReservasPorHotel() {
  const [hoteis, setHoteis] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [hotelSelecionado, setHotelSelecionado] = useState('');
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/reserva?idHotel=${hotelSelecionado}`);
          setReservas(response.data.content);
        } catch (error) {
          console.error("Erro ao buscar reservas:", error);
        } finally {
          setLoading(false);
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

      {loading ? (
        <div style={{ marginTop: '20px' }}>
          <CircularProgress />
          <Typography variant="body1" style={{ marginTop: '10px' }}>Carregando reservas...</Typography>
        </div>
      ) : reservas.length > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID da Reserva</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Data da Reserva</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Nome do Usuário</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Quantidade de Pessoas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva.id} hover sx={{ '&:hover': { backgroundColor: '#FFEBEE' } }}>
                  <TableCell>{reserva.id}</TableCell>
                  <TableCell>{reserva.dataReserva}</TableCell>
                  <TableCell>{reserva.usuario.nome}</TableCell>
                  <TableCell>{reserva.quantidadePessoas}</TableCell>
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
