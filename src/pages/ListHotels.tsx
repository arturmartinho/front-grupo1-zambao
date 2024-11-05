import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getHotels } from '../services/hotelService';

interface Hotel {
  id: string;
  nome: string;
  endereco: string;
  capacidade: number;
  precoPorDiaria: number;
}

const ListHotels: React.FC = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        setHotels(data);
      } catch (error) {
        console.error("Erro ao carregar hotéis", error);
      }
    };

    fetchHotels();
  }, []);
  
  return (
    <div>
      
      <Typography variant="h4" style={{ fontFamily: '"Urbanist", sans-serif', fontSize: '2.5rem', color:'#ff5a5f' }} gutterBottom>Hoteis</Typography>
      

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <TextField label="Search" variant="outlined" size="small" placeholder="Name, cidade..." />
        <IconButton>
          <FilterListIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={() => navigate('/hotels/create')}>
          Cadastrar Hotel
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hotel</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Capacidade</TableCell>
              <TableCell>Preço por diária</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.nome}</TableCell>
                <TableCell>{hotel.endereco}</TableCell>
                <TableCell>{hotel.capacidade}</TableCell>
                <TableCell>{`R$ ${hotel.precoPorDiaria.toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListHotels;
