import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Hoteis() {
  const [hoteis, setHoteis] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const exemploHoteis = [
    { id: 1, nome: 'Hotel São Paulo', endereco: 'Av. Paulista, 1000', capacidade: 100, precoPorDiaria: 200, cidade: { nome: 'São Paulo' } },
    { id: 2, nome: 'New York Hotel', endereco: '5th Avenue, 200', capacidade: 150, precoPorDiaria: 300, cidade: { nome: 'Nova Iorque' } },
    { id: 3, nome: 'Hotel Brasília', endereco: 'Setor Hoteleiro Norte', capacidade: 80, precoPorDiaria: 150, cidade: { nome: 'Brasília' } },
  ];

  const fetchHoteis = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/hotels');
      setHoteis(response.data);
    } catch (error) {
      console.error("Erro ao buscar hotéis:", error);
      setHoteis(exemploHoteis); // Fallback em caso de erro
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoteis();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredHoteis = hoteis.filter((hotel) =>
    hotel.nome.toLowerCase().includes(search.toLowerCase()) ||
    hotel.endereco.toLowerCase().includes(search.toLowerCase()) ||
    hotel.capacidade.toString().includes(search) ||
    hotel.precoPorDiaria.toString().includes(search) ||
    hotel.cidade.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleCadastrarHotel = () => {
    navigate('/cadastrar-hotel');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este hotel?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/hotels/${id}`);
        setHoteis(hoteis.filter(hotel => hotel.id !== id));
        alert("Hotel removido com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar hotel:", error);
        alert("Erro ao deletar o hotel. Tente novamente.");
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h3" style={{ color: '#FF6B6B', fontWeight: 'bold' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#FF6B6B' }}>HotelHub</Link>
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="Nome, endereço, capacidade, preço, cidade..."
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', width: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCadastrarHotel}
          sx={{
            backgroundColor: '#FF6B6B',
            '&:hover': {
              backgroundColor: '#FF4C4C',
            },
            marginRight: '10px'
          }}
        >
          Cadastrar Hotel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={fetchHoteis}
          sx={{
            '&:hover': {
              backgroundColor: '#E0E0E0',
            }
          }}
        >
          Atualizar
        </Button>
      </div>

      {loading ? (
        <div style={{ marginTop: '20px' }}>
          <CircularProgress />
          <Typography variant="body1" style={{ marginTop: '10px' }}>Carregando hotéis...</Typography>
        </div>
      ) : (
        <TableContainer component={Paper} style={{ maxWidth: '800px', margin: '0 auto', marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Endereço</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Capacidade</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Preço por Diária</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Cidade</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHoteis.map((hotel) => (
                <TableRow key={hotel.id} hover>
                  <TableCell>{hotel.nome}</TableCell>
                  <TableCell>{hotel.endereco}</TableCell>
                  <TableCell>{hotel.capacidade}</TableCell>
                  <TableCell>{hotel.precoPorDiaria}</TableCell>
                  <TableCell>{hotel.cidade.nome}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => handleDelete(hotel.id)}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#FFDDDD',
                          color: '#FF4C4C'
                        }
                      }}
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Hoteis;
