import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateHotel from './components/CreateHotel';
import ListHotels from './components/ListHotels';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListHotels />} />
        <Route path="/create-hotel" element={<CreateHotel />} />
      </Routes>
    </Router>
  );
};

export default App;
