import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CartItemType } from "../cart/cartSlice";

export interface OrderInfoType {
  name?: string;
  email?: string;
  zipcode?: string;
  address?: string;
  tel?: string;
  status?: number;
  orderDatetime?: string;
  payType?: number;
  cardNo?: string;
  timestamp?: number;
  totalPrice?: number;
}

export interface OrderType extends OrderInfoType {
  id?: string;
  userId?: string;
  itemInfo?: CartItemType[];
}

const initialState: OrderType[] = [];

export const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderType>) => {
      let newState = [...state, action.payload];
      newState.sort((a, b) => b.timestamp! - a.timestamp!);
      return (state = newState);
    },
    unsetOrders: (state) => {
      return (state = initialState);
    },
    setAllOrders: (state, action: PayloadAction<OrderType[]>) => {
      let newState = [...action.payload];
      newState.sort((a, b) => b.timestamp! - a.timestamp!);
      return (state = action.payload);
    },
  },
});

export const { setOrder, unsetOrders, setAllOrders } = ordersSlice.actions;
export const selectOrders = (state: RootState): OrderType[] => state.orders;

export default ordersSlice.reducer;
