import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './DefaultPage.module.scss';
import Header from './Header';
import Navbar from './Navbar';

export default function DefaultPage({
  title = '404',
  text = 'page not found!',
}) {
  return (
    <>
      <Header title={title} />
      <main className={styles.default}>
        <h1 className={styles.title}>{text}</h1>
        <Link className={styles.back} to='/'>
          back to shop
        </Link>
      </main>
      <Navbar />
    </>
  );
}

DefaultPage.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
};
