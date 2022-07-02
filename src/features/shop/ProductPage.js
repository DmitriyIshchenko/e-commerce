import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProductById } from './shopSlice';
import StarRating from '../../common/StarRating';

function ProductPage() {
  const { productId } = useParams();
  const product = useSelector((state) => selectProductById(state, productId));
  const {
    name,
    description,
    price,
    rating,
    images,
  } = product;

  return (
    <main>
      <section>
        <img src={images[0]} alt="" />
        <h2>{name}</h2>
        <StarRating rating={rating} />
        <span>{price}</span>
      </section>

      <section>
        <h3>specification</h3>
        <p>{description}</p>
      </section>

      <button type="button">add to cart</button>
    </main>
  );
}

export default ProductPage;