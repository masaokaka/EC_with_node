import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface ItemType {
  id?: number;
  name?: string;
  text?: string;
  mprice?: number;
  lprice?: number;
  img?: string;
}

const initialState: ItemType[] = [];

export const ItemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ItemType[]>) => {
      return (state = action.payload);
    },
    unsetItems: (state) => {
      return (state = initialState);
    },
  },
});

export const { setItems, unsetItems } = ItemsSlice.actions;
export const selectItems = (state: RootState) => state.items;

export default ItemsSlice.reducer;
