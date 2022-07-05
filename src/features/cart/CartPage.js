import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  decrement,
  increment,
  productRemovedFromCart,
  selectCartIds,
  selectCartItemById,
  selectSubtotalCost,
} from './cartSlice';
import { selectProductById } from '../shop/shopSlice';
import Header from '../../common/Header';

function CartItem({ productId }) {
  const dispatch = useDispatch();
  const { amount } = useSelector((state) => selectCartItemById(state, productId));
  const { name, images, price } = useSelector((state) => selectProductById(state, productId));

  return (
    <li>
      <h2>{name}</h2>
      <img src={images[0]} alt="" />
      <p>{price}</p>

      <button
        type="button"
        onClick={() => dispatch(decrement(productId))}
      >
        -
      </button>
      <span>{amount}</span>
      <button
        type="button"
        onClick={() => dispatch(increment(productId))}
      >
        +
      </button>

      <button
        type="button"
        onClick={() => dispatch(productRemovedFromCart(productId))}
      >
        delete
      </button>
    </li>
  );
}

function CartSummary() {
  const subtotalCost = useSelector(selectSubtotalCost);
  const shippingCost = 40;
  const totalCost = subtotalCost + shippingCost;
  return (
    <div>
      <p>{subtotalCost}</p>
      <p>{shippingCost}</p>
      <p>{totalCost}</p>
    </div>
  );
}

export default function CartPage() {
  const cartIds = useSelector(selectCartIds);

  let content;
  if (cartIds.length) {
    const renderedItems = cartIds.map((productId) => (
      <CartItem productId={productId} />
    ));
    content = (
      <>
        <ul>
          {renderedItems}
        </ul>
        <CartSummary />
      </>
    );
  } else {
    content = (
      <>
        <h2>your cart is empty</h2>
        <Link to="/">back to shop</Link>
      </>
    );
  }
  return (
    <>
      <Header title="your cart" />
      <main>
        {content}
      </main>
    </>
  );
}

CartItem.propTypes = {
  productId: PropTypes.string.isRequired,
};
