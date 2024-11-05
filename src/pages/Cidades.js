import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const exemploCidades = [
    { id: 1, nome: 'São Paulo', estado: 'SP', pais: 'Brasil' },
    { id: 2, nome: 'Nova Iorque', estado: 'NY', pais: 'EUA' },
    { id: 3, nome: 'Brasília', estado: 'DF', pais: 'Brasil' },
  ];

  useEffect(() => {
    fetchCidades();
  }, []);

  const fetchCidades = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/cidades');
      setCidades(response.data);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      setCidades(exemploCidades); // Usar exemplo em caso de erro
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCidades = cidades.filter((cidade) =>
    cidade.nome.toLowerCase().includes(search.toLowerCase()) ||
    cidade.estado.toLowerCase().includes(search.toLowerCase()) ||
    cidade.pais.toLowerCase().includes(search.toLowerCase()) ||
    cidade.id.toString().includes(search)
  );

  const handleCadastrarCidade = () => {
    navigate('/cadastrar-cidade');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta cidade?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/cidades/${id}`);
        setCidades(cidades.filter(cidade => cidade.id !== id));
        alert("Cidade removida com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar cidade:", error);
        alert("Erro ao deletar a cidade. Tente novamente.");
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
          label="Buscar cidade, estado, país..."
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', width: '300px' }}
        />
        <Button variant="contained" color="primary" style={{ backgroundColor: '#FF6B6B', marginRight: '10px' }} onClick={handleCadastrarCidade}>
          Cadastrar Cidade
        </Button>
        <Button variant="outlined" color="primary" onClick={fetchCidades}>
          Atualizar
        </Button>
      </div>

      {loading ? (
        <div style={{ marginTop: '20px' }}>
          <CircularProgress />
          <Typography variant="body1" style={{ marginTop: '10px' }}>Carregando cidades...</Typography>
        </div>
      ) : (
        <TableContainer component={Paper} style={{ maxWidth: '800px', margin: '0 auto', marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Cidade</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>País</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCidades.map((cidade) => (
                <TableRow key={cidade.id} hover>
                  <TableCell>{cidade.nome}</TableCell>
                  <TableCell>{cidade.estado}</TableCell>
                  <TableCell>{cidade.pais}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => handleDelete(cidade.id)}
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

export default Cidades;
