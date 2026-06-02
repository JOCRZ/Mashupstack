import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loaded: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
      state.loaded = true;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
