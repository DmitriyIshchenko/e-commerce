import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import ShopPage from './features/shop/ShopPage';
import ProductPage from './features/shop/ProductPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
