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
import Navbar from '../../common/Navbar';
import { ReactComponent as Trash } from '../../assets/system icon/24px/Trash.svg';
import { ReactComponent as Minus } from '../../assets/system icon/16px/Minus.svg';
import { ReactComponent as Plus } from '../../assets/system icon/16px/Plus.svg';
import { formatCurrency } from '../../utils/helpers';

import styles from './CartPage.module.scss';

function CartItem({ productId }) {
  const dispatch = useDispatch();
  const { amount } = useSelector((state) =>
    selectCartItemById(state, productId)
  );
  const { name, images, price } = useSelector((state) =>
    selectProductById(state, productId)
  );
  return (
    <li className={styles.item}>
      <p className={styles.name}>{name}</p>
      <img src={images[0]} alt='' />
      <p className={styles.price}>{formatCurrency(price)}</p>

      <div className={styles.controls}>
        <button
          className={styles.decrement}
          type='button'
          onClick={() => dispatch(decrement(productId))}
        >
          <Minus />
        </button>
        <span className={styles.amount}>{amount}</span>
        <button
          className={styles.increment}
          type='button'
          onClick={() => dispatch(increment(productId))}
        >
          <Plus />
        </button>
      </div>

      <button
        className={styles.remove}
        type='button'
        onClick={() => dispatch(productRemovedFromCart(productId))}
      >
        <Trash />
      </button>
    </li>
  );
}

function CartSummary() {
  const subtotalCost = useSelector(selectSubtotalCost);
  const shippingCost = 40;
  const totalCost = subtotalCost + shippingCost;
  return (
    <section className={styles.summary}>
      <div className={styles.row}>
        <p>Items</p>
        <p className={styles.cost}>{formatCurrency(subtotalCost)}</p>
      </div>

      <div className={styles.row}>
        <p>Shipping</p>
        <p className={styles.cost}>{formatCurrency(shippingCost)}</p>
      </div>

      <div className={styles.total}>
        <p>Total Price</p>
        <p className={styles.cost}>{formatCurrency(totalCost)}</p>
      </div>
    </section>
  );
}

export default function CartPage() {
  const cartIds = useSelector(selectCartIds);

  let content;
  if (cartIds.length) {
    const renderedItems = cartIds.map((productId) => (
      <CartItem productId={productId} key={productId} />
    ));
    content = (
      <>
        <ul className={styles.list}>{renderedItems}</ul>
        <CartSummary />
        <button className={styles.checkOutBtn}>Check out</button>
      </>
    );
  } else {
    content = (
      <>
        <h2>your cart is empty</h2>
        <Link to='/'>back to shop</Link>
      </>
    );
  }
  return (
    <>
      <Header title='your cart' />
      <main className={styles.cart}>{content}</main>
      <Navbar />
    </>
  );
}

CartItem.propTypes = {
  productId: PropTypes.string.isRequired,
};
