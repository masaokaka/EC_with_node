import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface ToppingType {
  id?: number;
  name?: string;
  mprice?: number;
  lprice?: number;
}

const initialState: ToppingType[] = [];

export const ToppingsSlice = createSlice({
  name: "toppings",
  initialState,
  reducers: {
    setToppings: (state, action: PayloadAction<ToppingType[]>) => {
      return (state = action.payload);
    },
    unsetToppings: (state) => {
      return (state = initialState);
    },
  },
});

export const { setToppings, unsetToppings } = ToppingsSlice.actions;
export const selectToppings = (state: RootState) => state.toppings;

export default ToppingsSlice.reducer;
