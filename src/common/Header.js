import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { ReactComponent as LeftSvg } from '../assets/system icon/24px/Left.svg';

import styles from './Header.module.scss';

export default function Header({ title }) {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <button
        className={styles.btnBack}
        type='button'
        onClick={() => navigate(-1)}
      >
        <LeftSvg />
      </button>
      <p>{title}</p>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
