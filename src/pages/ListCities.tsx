// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, IconButton } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { getCities } from '../services/cityService';

// interface City {
//   id: string;
//   nome: string;
//   estado: string;
//   pais: string;
// }

// const ListCities: React.FC = () => {
//   const navigate = useNavigate();
//   const [cities, setCities] = useState<City[]>([]);

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const data = await getCities();
//         setCities(data);
//       } catch (error) {
//         console.error("Erro ao carregar cidades", error);
//       }
//     };

//     fetchCities();
//   }, []);

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>HotelHub - Cidades</Typography>

//       {/* Barra de Pesquisa e Botão de Cadastrar */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
//         <TextField label="Search" variant="outlined" size="small" placeholder="Cidade, estado, país..." />
//         <IconButton>
//           <FilterListIcon />
//         </IconButton>
//         <Button variant="contained" color="primary" onClick={() => navigate('/cities/create')}>
//           Cadastrar Cidade
//         </Button>
//       </div>

//       {/* Tabela de Listagem de Cidades */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Cidade</TableCell>
//               <TableCell>Estado</TableCell>
//               <TableCell>País</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {cities.map((city) => (
//               <TableRow key={city.id}>
//                 <TableCell>{city.nome}</TableCell>
//                 <TableCell>{city.estado}</TableCell>
//                 <TableCell>{city.pais}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default ListCities;


import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getCities } from '../services/cityService';

interface City {
  id: string;
  nome: string;
  estado: string;
  pais: string;
}

const ListCities: React.FC = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error("Erro ao carregar cidades", error);
      }
    };

    fetchCities();
  }, []);

  const handleCityClick = (cityId: string) => {
    navigate(`/cities/${cityId}/report`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>HotelHub - Cidades</Typography>

      {/* Barra de Pesquisa e Botão de Cadastrar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <TextField label="Search" variant="outlined" size="small" placeholder="Cidade, estado, país..." />
        <IconButton>
          <FilterListIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={() => navigate('/cities/create')}>
          Cadastrar Cidade
        </Button>
      </div>

      {/* Tabela de Listagem de Cidades */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>País</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((city) => (
              <TableRow 
                key={city.id} 
                onClick={() => handleCityClick(city.id)} 
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{city.nome}</TableCell>
                <TableCell>{city.estado}</TableCell>
                <TableCell>{city.pais}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListCities;
