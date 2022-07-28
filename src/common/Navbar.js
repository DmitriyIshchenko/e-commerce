import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { selectCartIds } from '../features/cart/cartSlice';

import { ReactComponent as Search } from '../assets/system icon/24px/Search.svg';
import { ReactComponent as Cart } from '../assets/system icon/24px/Cart.svg';

import styles from './Navbar.module.scss';

export default function Navbar() {
  const itemsInCart = useSelector(selectCartIds).length;
  const current = useLocation().pathname;
  const amountClass =
    itemsInCart && current !== '/cart' ? styles.amount : 'd-none';

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to='/' className={styles.navLink}>
            <Search />
            <p>Explore</p>
          </Link>
        </li>
        <li>
          <Link to='/cart' className={styles.navLink}>
            <Cart />
            <span className={amountClass}>{itemsInCart}</span>
            <p>Cart</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
