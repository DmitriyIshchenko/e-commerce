import {
  createSelector,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

const cartAdapter = createEntityAdapter();
const initialState = cartAdapter.getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    productAddedToCart: {
      reducer: cartAdapter.addOne,
      prepare: (productId, price) => ({
        payload: {
          id: productId,
          price,
          amount: 1,
        },
      }),
    },
    productRemovedFromCart: cartAdapter.removeOne,
    increment: (state, action) => {
      state.entities[action.payload].amount += 1;
    },
    decrement: (state, action) => {
      const { amount } = state.entities[action.payload];
      if (amount === 1) {
        cartAdapter.removeOne(state, action);
      } else state.entities[action.payload].amount -= 1;
    },
  },
});

export const {
  productAddedToCart,
  productRemovedFromCart,
  increment,
  decrement,
} = cartSlice.actions;

export const {
  selectAll: selectCartItems,
  selectIds: selectCartIds,
  selectById: selectCartItemById,
} = cartAdapter.getSelectors((state) => state.cart);

export const selectSubtotalCost = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.amount, 0)
);
export default cartSlice.reducer;
