import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './shopSlice';

function ShopPage() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.shop.status);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div>ShopPage</div>
  );
}

export default ShopPage;
