import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProductById } from './shopSlice';
import StarRating from '../../common/StarRating';
import { productAddedToCart, selectCartItemById } from '../cart/cartSlice';
import DefaultPage from '../../common/DefaultPage';
import Header from '../../common/Header';
import PropTypes from 'prop-types';

import styles from './ProductPage.module.scss';

const AddToCartButton = ({ productId, price }) => {
  const dispatch = useDispatch();
  const isInCart = !!useSelector((state) =>
    selectCartItemById(state, productId)
  );
  const btnText = isInCart ? 'in cart' : 'add to cart';
  return (
    <button
      type='button'
      className={styles.btn}
      onClick={() => dispatch(productAddedToCart(productId, price))}
      disabled={isInCart}
    >
      {btnText}
    </button>
  );
};

export default function ProductPage() {
  const { productId } = useParams();
  const product = useSelector((state) => selectProductById(state, productId));

  if (!product) {
    return <DefaultPage />;
  }

  const { name, description, price, rating, images } = product;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+price);

  return (
    <>
      <Header title={name} />
      <main className={styles.page}>
        <section>
          <div className={styles.imgBox}>
            <img src={images[0]} alt='' />
          </div>

          <div className={styles.info}>
            <p className={styles.name}>{name}</p>
            <StarRating rating={rating} size={16} />
            <p className={styles.price}>{formattedPrice}</p>
          </div>
        </section>

        <section className={styles.meta}>
          <h2>specification</h2>
          <p>{description}</p>
        </section>

        <AddToCartButton price={price} productId={productId} />
      </main>
    </>
  );
}

AddToCartButton.propTypes = {
  productId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
