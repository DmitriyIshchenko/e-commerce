import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersUpdated } from './shopSlice';

export default function Filters() {
  const dispatch = useDispatch();

  const minPrice = useSelector((state) => state.shop.minPrice);
  const maxPrice = useSelector((state) => state.shop.maxPrice);

  const [newMinPrice, setNewMinPrice] = useState(minPrice);
  const [newMaxPrice, setNewMaxPrice] = useState(maxPrice);

  const onApplyClicked = () => {
    dispatch(filtersUpdated({ minPrice: newMinPrice, maxPrice: newMaxPrice }));
  };

  return (
    <form>
      <fieldset>
        <label htmlFor="min-price">
          <input
            id="min-price"
            type="number"
            value={newMinPrice}
            onChange={(e) => setNewMinPrice(+e.target.value)}
          />
        </label>

        <label htmlFor="max-price">
          <input
            id="max-price"
            type="number"
            value={newMaxPrice}
            onChange={(e) => setNewMaxPrice(+e.target.value)}
          />
        </label>
      </fieldset>
      <button
        type="button"
        onClick={onApplyClicked}
      >
        Apply
      </button>
    </form>
  );
}
