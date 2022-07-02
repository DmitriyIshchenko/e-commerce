import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectProductById } from './shopSlice';
import StarRating from '../../common/StarRating';

function ProductCard({ productId }) {
  const product = useSelector((state) => selectProductById(state, productId));
  const {
    name,
    price,
    rating,
    images,
  } = product;

  return (
    <li>
      <Link to={`/product/${productId}`}>
        <picture>
          <img src={images[0]} alt="" />
        </picture>

        <div>
          <h2>{name}</h2>
          <StarRating rating={rating} />
          <span>{price}</span>
        </div>
      </Link>
    </li>
  );
}

ProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductCard;
