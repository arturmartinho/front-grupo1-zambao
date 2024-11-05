import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface Hotel {
  id: number;
  name: string;
  address: string;
  capacity: number;
  pricePerNight: number;
}

interface City {
  id: number;
  name: string;
  state: string;
  country: string;
}

const CityReport: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  // Função para buscar dados da cidade
  const fetchCityData = async () => {
    try {
      const response = await fetch(`/api/cities/${cityId}`);
      if (response.ok) {
        const cityData = await response.json();
        setCity(cityData);
      } else {
        console.error('Erro ao buscar dados da cidade');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da cidade:', error);
    }
  };

  // Função para buscar lista de hotéis
  const fetchHotelData = async () => {
    try {
      const response = await fetch(`/api/cities/${cityId}/hotels`);
      if (response.ok) {
        const hotelData = await response.json();
        const sortedHotels = hotelData.sort((a: Hotel, b: Hotel) => b.capacity - a.capacity);
        setHotels(sortedHotels);
      } else {
        console.error('Erro ao buscar lista de hotéis');
      }
    } catch (error) {
      console.error('Erro ao buscar lista de hotéis:', error);
    }
  };

  useEffect(() => {
    fetchCityData();
    fetchHotelData();
  }, [cityId]);

  return (
    <div>
      <Typography variant="h4">
        {city?.name} - {city?.state} - {city?.country}
      </Typography>
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
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.address}</TableCell>
                <TableCell>{hotel.capacity}</TableCell>
                <TableCell>{`R$ ${hotel.pricePerNight.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CityReport;
