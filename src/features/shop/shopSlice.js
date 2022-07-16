import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import client from '../../api/client';

const shopAdapter = createEntityAdapter();
const initialState = shopAdapter.getInitialState({
  status: 'idle',
  error: null,
  sortBy: {
    field: 'rating',
    order: 'desc',
  },
  minPrice: 0,
  maxPrice: 0,
  filters: {
    minPrice: 0,
    maxPrice: 0,
    brands: [],
  },
});

export const fetchProducts = createAsyncThunk(
  'shop/fetchProducts',
  async () => {
    const response = await client.get('/fakeApi/products');
    return response.data;
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    sortByUpdated(state, action) {
      state.sortBy = action.payload;
    },
    filtersUpdated(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const products = action.payload;
        const minPrice = Math.min(...products.map((item) => item.price));
        const maxPrice = Math.max(...products.map((item) => item.price));

        const brands = [
          'all',
          ...new Set(products.map((product) => product.brand)),
        ].map((brand) => ({ active: true, name: brand }));

        state.status = 'succeeded';
        state.minPrice = minPrice;
        state.maxPrice = maxPrice;
        state.filters = {
          ...state.filters,
          minPrice,
          maxPrice,
          brands,
        };

        shopAdapter.upsertMany(state, products);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectById: selectProductById } = shopAdapter.getSelectors(
  (state) => state.shop
);

export default shopSlice.reducer;

export const { sortByUpdated, filtersUpdated } = shopSlice.actions;

export const selectFilteredProductIds = (state) => {
  const { ids, entities, filters } = state.shop;
  let tempIds = [...ids];

  const { minPrice, maxPrice, brands } = filters;
  const activeBrands = brands
    .filter((brand) => brand.active)
    .map((brand) => brand.name);

  tempIds = tempIds
    .filter(
      (id) => entities[id].price >= minPrice && entities[id].price <= maxPrice
    )
    .filter((id) => activeBrands.includes(entities[id].brand));

  // sort
  const { field, order } = state.shop.sortBy;
  return tempIds.sort((a, b) =>
    order === 'asc'
      ? entities[a][field] - entities[b][field]
      : entities[b][field] - entities[a][field]
  );
};
