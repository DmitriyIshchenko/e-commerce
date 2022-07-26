import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, selectFilteredProductIds } from './shopSlice';
import Spinner from '../../common/Spinner';
import ProductCard from './ProductCard';
import { ReactComponent as Filter } from '../../assets/system icon/24px/Filter.svg';
import { ReactComponent as Sort } from '../../assets/system icon/24px/Sort.svg';

import styles from './ShopPage.module.scss';

function ShopPage() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.shop.status);
  const error = useSelector((state) => state.shop.error);
  const productIds = useSelector(selectFilteredProductIds);
  const amount = productIds.length;
  const amountStr = amount === 1 ? '1 product' : `${amount} products`;

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
      <>
        <span className={styles.amount}>{amountStr}</span>
        <ul className={styles.list}>{renderedProducts}</ul>;
      </>
    );
  } else if (status === 'rejected') {
    content = <div>{error}</div>;
  }

  return (
    <>
      <header className={styles.header}>
        <h1>Shop</h1>
        <Link to='/sort'>
          <Sort />
        </Link>
        <Link to='/filter'>
          <Filter />
        </Link>
      </header>
      <main className={styles.shop}>{content}</main>
    </>
  );
}

export default ShopPage;
