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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
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

export const { sortByUpdated } = shopSlice.actions;

export const selectFilteredProductIds = (state) => {
  const { ids, entities } = state.shop;

  // sort
  const { field, order } = state.shop.sortBy;
  return [...ids].sort((a, b) => (order === 'asc' ? entities[a][field] - entities[b][field]
    : entities[b][field] - entities[a][field]));
};
