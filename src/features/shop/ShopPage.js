import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, selectFilteredProductIds } from './shopSlice';
import Spinner from '../../common/Spinner';
import ProductCard from './ProductCard';
import Navbar from '../../common/Navbar';
import DefaultPage from '../../common/DefaultPage';

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
        <ul className={styles.list}>{renderedProducts}</ul>
      </>
    );
  } else if (status === 'rejected') {
    console.log(error);
    return <DefaultPage text='Error!' />;
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
      <Navbar />
    </>
  );
}

export default ShopPage;
