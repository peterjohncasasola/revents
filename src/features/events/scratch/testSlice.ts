import { createSlice } from "@reduxjs/toolkit";

type State = {
  value: number;
};

const initialState: State = {
  value: 0,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});


export const { increment, decrement } = testSlice.actions;
export default testSlice;
