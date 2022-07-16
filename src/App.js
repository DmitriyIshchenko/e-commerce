import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import ShopPage from './features/shop/ShopPage';
import ProductPage from './features/shop/ProductPage';
import Sorting from './features/shop/Sorting';
import Filters from './features/shop/Filters';
import CartPage from './features/cart/CartPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<ShopPage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='/sort' element={<Sorting />} />
        <Route path='/filter' element={<Filters />} />
        <Route path='cart' element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
