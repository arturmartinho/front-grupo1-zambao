import axios from 'axios';

// URL base da API - ajuste para o seu endpoint
const API_URL = 'http://localhost:8080/api/hotels';

// Pegar Hoteis
export const getHotels = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar hotéis", error);
    throw error;
  }
};

// Criar Hoteis
export const createHotel = async (hotelData: {
  nome: string;
  endereco: string;
  capacidade: number;
  precoPorDiaria: number;
  cidadeId: string;
}) => {
  try {
    const response = await axios.post(API_URL, hotelData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar hotel", error);
    throw error;
  }
};
