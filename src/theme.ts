// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5A60', // cor primária, pode personalizar
    },
    secondary: {
      main: '#f50057', // cor secundária
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Defina uma fonte personalizada
    h4: {
      fontWeight: 600, // Ajuste o peso da fonte para títulos
    },
  },
  shape: {
    borderRadius: 20, // Define um raio de borda para todos os botões
  },
});

export default theme;
