import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, selectFilteredProductIds } from './shopSlice';
import Spinner from '../../common/Spinner';
import ProductCard from './ProductCard';

function ShopPage() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.shop.status);
  const error = useSelector((state) => state.shop.error);
  const productIds = useSelector(selectFilteredProductIds);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <Spinner />;
  } else if (status === 'succeeded') {
    const renderedProducts = productIds.map((productId) => (
      <ProductCard key={productId} productId={productId} />
    ));

    content = (
      <ul>
        {renderedProducts}
      </ul>
    );
  } else if (status === 'rejected') {
    content = <div>{error}</div>;
  }

  return (
    <>
      <header>
        <Link to="/sort">sort</Link>
        <Link to="/filter">filter</Link>
      </header>
      <main>
        {content}
      </main>
    </>
  );
}

export default ShopPage;
