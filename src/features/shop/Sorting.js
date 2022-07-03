import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortByUpdated } from './shopSlice';

export default function Sorting() {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.shop.sortBy);
  const options = [
    {
      field: 'price',
      order: 'desc',
      description: 'Price: higher first',
    },
    {
      field: 'price',
      order: 'asc',
      description: 'Price: lower first',
    },
    {
      field: 'rating',
      order: 'desc',
      description: 'Rating: higher first',
    },
  ];

  const handleChange = (e) => {
    const { field, order } = options[+e.target.value];
    dispatch(sortByUpdated({ field, order }));
  };
  const renderedRadios = options.map((option, index) => {
    const { field, order, description } = option;
    const isChecked = field === sortBy.field && order === sortBy.order;
    return (
      <label htmlFor={`option${index}`}>
        {description}
        <input
          id={`option${index}`}
          name="sort"
          type="radio"
          onChange={handleChange}
          checked={isChecked}
          value={index}
        />
      </label>
    );
  });

  return (
    <div>
      {renderedRadios}
    </div>
  );
}
