import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ItemsSlice from "../features/item/itemsSlice";
import SidenavSlice from "../features/sidenavSlice";
import ToppingsSlice from "../features/topping/toppingsSlice";
import UserSlice from "../features/user/userSlice";
import CartSlice from "../features/cart/cartSlice";
import UserInfoSlice from "../features/userinfo/userinfoSlice";
import OrderSlice from "../features/order/ordersSlice";
import UsersInfoSlice from "../features/usersinfo/usersinfoSlice";

export const store = configureStore({
  reducer: {
    sidenav: SidenavSlice,
    user: UserSlice,
    items: ItemsSlice,
    toppings: ToppingsSlice,
    cart: CartSlice,
    userinfo: UserInfoSlice,
    orders: OrderSlice,
    usersinfo: UsersInfoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
