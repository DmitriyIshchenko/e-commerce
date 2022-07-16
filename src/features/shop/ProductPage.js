import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProductById } from './shopSlice';
import StarRating from '../../common/StarRating';
import { productAddedToCart } from '../cart/cartSlice';
import DefaultPage from '../../common/DefaultPage';
import Header from '../../common/Header';

function ProductPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => selectProductById(state, productId));

  if (!product) {
    return <DefaultPage />;
  }

  const { name, description, price, rating, images } = product;

  return (
    <>
      <Header title={name} />
      <main>
        <section>
          <img src={images[0]} alt='' />
          <h2>{name}</h2>
          <StarRating rating={rating} />
          <span>{price}</span>
        </section>

        <section>
          <h3>specification</h3>
          <p>{description}</p>
        </section>

        <button
          type='button'
          onClick={() => dispatch(productAddedToCart(productId, price))}
        >
          add to cart
        </button>
      </main>
    </>
  );
}

export default ProductPage;
