import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Portfolio from './Portfolio';
import Admin from './Admin';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/"></Link>
        <Link to="/admin"></Link>
      </nav>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
