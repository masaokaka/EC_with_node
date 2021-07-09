import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export interface CartTopType {
  id: number;
  size: number;
}

export interface CartItemType {
  id: string;
  itemId: number;
  itemNum: number;
  itemSize: number;
  toppings: CartTopType[];
}

export interface CartType {
  id?: string;
  userId?: string;
  itemInfo?: CartItemType[];
  status?: number;
}

const initialState: CartType = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartType>) => {
      return (state = action.payload);
    },
    unsetCart: (state) => {
      return (state = initialState);
    },
  },
});

export const { setCart, unsetCart } = cartSlice.actions;
export const selectCart = (state: RootState):CartType => state.cart;

export default cartSlice.reducer;
