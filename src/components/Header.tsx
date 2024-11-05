import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ backgroundColor: 'white', alignItems: 'center' }} className="header-toolbar" elevation={0}>
      <Toolbar className="toolbar-container">
        <Typography variant="h4" style={{ fontFamily: '"Urbanist", sans-serif', fontSize: '4rem' }} className="header-title">
          HotelHub
        </Typography>
        <div className="button-container">
          <Button className="header-button"  onClick={() => navigate('/')}>
            Hotel
          </Button>
          <Button className="header-button" onClick={() => navigate('/cities')}>
            Cidade
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
