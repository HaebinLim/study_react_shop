import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice';

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, title: 'White and Black', count: 2 },
    { id: 2, title: 'Grey yordan', count: 1 },
  ],
  reducers: {
    updateCart(state, { payload }) {
      state.push(payload)
    },
    countUp(state, { payload }) {
      let idx = state.findIndex(item => item.id === payload);
      state[idx].count++;

      // let target = state.find(item => item.id === payload);
      // target.count++;
    }
  }
});

export let { updateCart, countUp } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  }
})