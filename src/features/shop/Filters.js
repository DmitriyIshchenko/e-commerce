import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { filtersUpdated } from './shopSlice';
import Header from '../../common/Header';

import styles from './Filters.module.scss';
import classNames from 'classnames';

function PriceFilter(props) {
  const { newMinPrice, setNewMinPrice, newMaxPrice, setNewMaxPrice } = props;

  return (
    <fieldset className={styles.fieldset}>
      <p className={styles.title}>price range</p>
      <div className={styles.byPrice}>
        <label htmlFor='min-price'>
          <span className={styles.currency}>$</span>
          <input
            className={styles.minmax}
            id='min-price'
            type='text'
            pattern='[0-9]*'
            value={newMinPrice}
            onChange={(e) => setNewMinPrice(+e.target.value)}
          />
        </label>

        <label htmlFor='max-price'>
          <span className={styles.currency}>$</span>
          <input
            className={styles.minmax}
            id='max-price'
            type='text'
            pattern='[0-9]*'
            value={newMaxPrice}
            onChange={(e) => setNewMaxPrice(+e.target.value)}
          />
        </label>
      </div>
    </fieldset>
  );
}

function BrandsFilter({ brands, setBrands }) {
  const onCheckboxChange = (e) => {
    const { checked: active, value: targetName } = e.target;
    const tempBrands = brands.map((brand) =>
      [brand.name, 'all'].includes(targetName) ? { ...brand, active } : brand
    );
    const areAllChecked = tempBrands
      .filter((brand) => brand !== 'all')
      .every((brand) => brand.active);
    tempBrands[0] = { active: areAllChecked, name: 'all' };
    setBrands(tempBrands);
  };

  const brandsListItems = brands.map((item) => (
    <li key={item.name}>
      <label className={styles.label} htmlFor={item.name}>
        <span className={styles.brandName}>{item.name}</span>
        <span
          className={classNames(styles.checkbox, {
            [styles.checked]: item.active,
          })}
        ></span>
        <input
          className='sr-only'
          type='checkbox'
          id={item.name}
          checked={item.active}
          value={item.name}
          onChange={(e) => onCheckboxChange(e)}
        />
      </label>
    </li>
  ));

  return (
    <fieldset className={styles.fieldset}>
      <p className={styles.title}>Brands</p>
      <ul className={styles.byBrand}>{brandsListItems}</ul>
    </fieldset>
  );
}

export default function Filters() {
  const dispatch = useDispatch();

  const minPrice = useSelector((state) => state.shop.minPrice);
  const maxPrice = useSelector((state) => state.shop.maxPrice);

  const [newMinPrice, setNewMinPrice] = useState(minPrice);
  const [newMaxPrice, setNewMaxPrice] = useState(maxPrice);
  const [brands, setBrands] = useState(
    useSelector((state) => state.shop.filters.brands)
  );

  const onApplyClicked = () => {
    dispatch(
      filtersUpdated({ minPrice: newMinPrice, maxPrice: newMaxPrice, brands })
    );
  };

  return (
    <aside>
      <Header title='filters' />
      <form className={styles.form}>
        <PriceFilter
          newMinPrice={newMinPrice}
          setNewMinPrice={setNewMinPrice}
          newMaxPrice={newMaxPrice}
          setNewMaxPrice={setNewMaxPrice}
        />
        <BrandsFilter brands={brands} setBrands={setBrands} />
        <button
          className={styles.applyBtn}
          type='button'
          onClick={onApplyClicked}
        >
          Apply
        </button>
      </form>
    </aside>
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
    })
  ).isRequired,
  setBrands: PropTypes.func.isRequired,
};
