import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListHotels from './pages/ListHotels';
import CreateHotel from './pages/CreateHotel';
import ListCities from './pages/ListCities';
import CreateCity from './pages/CreateCity';
import CityReport from './pages/CityReport';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ListHotels />} />
          <Route path="/hotels/create" element={<CreateHotel />} />
          <Route path="/cities" element={<ListCities />} />
          <Route path="/cities/create" element={<CreateCity />} />
          <Route path="/cities/report" element={<CityReport />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
