import {
  createAsyncThunk, createEntityAdapter, createSlice,
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
  },
});

export const fetchProducts = createAsyncThunk(
  'shop/fetchProducts',
  async () => {
    const response = await client.get('/fakeApi/products');
    return response.data;
  },
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
        state.status = 'succeeded';

        const minPrice = Math.min(...action.payload.map((item) => item.price));
        const maxPrice = Math.max(...action.payload.map((item) => item.price));
        state.minPrice = minPrice;
        state.maxPrice = maxPrice;
        state.filters = {
          ...state.filters,
          minPrice,
          maxPrice,
        };

        shopAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  selectById: selectProductById,
} = shopAdapter.getSelectors((state) => state.shop);
export default shopSlice.reducer;

export const { sortByUpdated, filtersUpdated } = shopSlice.actions;

export const selectFilteredProductIds = (state) => {
  const { ids, entities, filters } = state.shop;
  let tempIds = ids.slice();

  const { minPrice, maxPrice } = filters;

  tempIds = tempIds
    .filter((id) => entities[id].price >= minPrice && entities[id].price <= maxPrice);

  // sort
  const { field, order } = state.shop.sortBy;
  return tempIds.sort((a, b) => (order === 'asc' ? entities[a][field] - entities[b][field]
    : entities[b][field] - entities[a][field]));
};
