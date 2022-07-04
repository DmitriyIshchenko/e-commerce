import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { filtersUpdated } from './shopSlice';

function PriceFilter(props) {
  const {
    newMinPrice,
    setNewMinPrice,
    newMaxPrice,
    setNewMaxPrice,
  } = props;

  return (
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
  );
}

function BrandsFilter({ brands, setBrands }) {
  const onCheckboxChange = (e) => {
    const { checked: active, value: targetName } = e.target;
    const tempBrands = brands.map((brand) => ([brand.name, 'all'].includes(targetName) ? { ...brand, active } : brand));
    const areAllChecked = tempBrands.filter((brand) => brand !== 'all').every((brand) => brand.active);
    tempBrands[0] = { active: areAllChecked, name: 'all' };
    setBrands(tempBrands);
  };
  const brandsCheckboxes = brands.map((item) => (
    <li key={item.name}>
      <label htmlFor={item.name}>
        {item.name}
        <input
          type="checkbox"
          id={item.name}
          checked={item.active}
          value={item.name}
          onChange={(e) => onCheckboxChange(e)}
        />
      </label>
    </li>
  ));

  return (
    <fieldset>
      <ul>
        {brandsCheckboxes}
      </ul>
    </fieldset>
  );
}

export default function Filters() {
  const dispatch = useDispatch();

  const minPrice = useSelector((state) => state.shop.minPrice);
  const maxPrice = useSelector((state) => state.shop.maxPrice);

  const [newMinPrice, setNewMinPrice] = useState(minPrice);
  const [newMaxPrice, setNewMaxPrice] = useState(maxPrice);
  const [brands, setBrands] = useState(useSelector((state) => state.shop.filters.brands));

  const onApplyClicked = () => {
    dispatch(filtersUpdated({ minPrice: newMinPrice, maxPrice: newMaxPrice, brands }));
  };

  return (
    <form>
      <PriceFilter
        newMinPrice={newMinPrice}
        setNewMinPrice={setNewMinPrice}
        newMaxPrice={newMaxPrice}
        setNewMaxPrice={setNewMaxPrice}
      />
      <BrandsFilter
        brands={brands}
        setBrands={setBrands}
      />
      <button
        type="button"
        onClick={onApplyClicked}
      >
        Apply
      </button>
    </form>
  );
}

PriceFilter.propTypes = {
  newMinPrice: PropTypes.number.isRequired,
  setNewMinPrice: PropTypes.func.isRequired,
  newMaxPrice: PropTypes.number.isRequired,
  setNewMaxPrice: PropTypes.func.isRequired,
};

BrandsFilter.propTypes = {
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  setBrands: PropTypes.func.isRequired,
};
