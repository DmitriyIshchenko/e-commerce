import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectProductById } from './shopSlice';
import StarRating from '../../common/StarRating';
import { formatCurrency } from '../../utils/helpers';

import styles from './ProductCard.module.scss';

function ProductCard({ productId }) {
  const product = useSelector((state) => selectProductById(state, productId));
  const { name, price, rating, images } = product;

  return (
    <li className={styles.card}>
      <Link to={`/product/${productId}`}>
        <img className={styles.image} src={images[0]} alt='' />

        <div className={styles.info}>
          <header>
            <p className={styles.name}>{name}</p>
            <StarRating rating={rating} />
          </header>
          <p className={styles.price}>{formatCurrency(price)}</p>
        </div>
      </Link>
    </li>
  );
}

ProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductCard;
