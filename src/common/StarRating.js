import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as StarSvg } from '../assets/Star 9.svg';

export default function StarRating({ rating, height = 16, width = 16 }) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <StarSvg
        fill={rating >= i ? '#FFC833' : '#EAF0FF'}
        height={height}
        width={width}
      />
    );
  }
  return <div>{stars}</div>;
}
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
