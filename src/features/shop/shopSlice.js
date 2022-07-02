import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import client from '../../api/client';

const shopAdapter = createEntityAdapter();
const initialState = shopAdapter.getInitialState({
  status: 'idle',
  error: null,
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
  selectIds: selectProductIds,
  selectById: selectProductById,
} = shopAdapter.getSelectors((state) => state.shop);
export default shopSlice.reducer;
