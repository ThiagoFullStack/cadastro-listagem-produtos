import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro/Cadastro';
import Listagem from './pages/Listagem/Listagem';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/listagem" element={<Listagem />} />
      </Routes>
    </Router>
  );
};

export default App;

