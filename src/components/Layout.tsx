import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Container style={{ marginTop: '2rem' }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
