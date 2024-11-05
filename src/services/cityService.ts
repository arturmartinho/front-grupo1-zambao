import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cidades';

export const getCities = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cidades", error);
    throw error;
  }
};

export const createCity = async (cityData: { nome: string; estado: string; pais: string }) => {
    try {
      const response = await axios.post(API_URL, cityData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar cidade", error);
      throw error;
    }
  };