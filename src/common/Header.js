import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { ReactComponent as LeftSvg } from '../assets/system icon/24px/Left.svg';

export default function Header({ title }) {
  const navigate = useNavigate();
  return (
    <header>
      <button type='button' onClick={() => navigate(-1)}>
        <LeftSvg />
      </button>
      {title}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
