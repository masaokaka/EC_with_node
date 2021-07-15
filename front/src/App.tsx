import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { Sidenav } from "./components/organisms/Sidenav";
import Router from "./Router";
import { Inner, LoadingPage } from "./components/atoms";

import "./App.css";
import { auth } from "./apis/firebase/index";

import {
  getUserinfoAsync,
  selectUserInfo,
  unsetUser,
  selectUserInfoStatus,
} from "./features/userinfo/userinfoSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  fetchAllItemsAsync,
  selectItemsStatus,
} from "./features/item/itemsSlice";
import {
  fetchAllToppingsAsync,
  selectToppingsStatus,
} from "./features/topping/toppingsSlice";
import { unsetCart, fetchCartAsync } from "./features/cart/cartSlice";
import { unsetOrders, fetchOrdersAsync } from "./features/order/ordersSlice";

function App() {
  const dispatch = useAppDispatch();
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const itemsStatus = useAppSelector(selectItemsStatus);
  const toppingsStatus = useAppSelector(selectToppingsStatus);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        dispatch(getUserinfoAsync({ uid }));
        dispatch(fetchCartAsync({ uid }));
        dispatch(fetchOrdersAsync({ uid }));
      } else {
        dispatch(unsetUser());
        dispatch(unsetCart());
        dispatch(unsetOrders());
      }
    });
    dispatch(fetchAllItemsAsync());
    dispatch(fetchAllToppingsAsync());
  }, []);

  return (
    <>
      <Header />
      <Sidenav />
      <Inner>
        {userinfoStatus === "loading" ||
        itemsStatus === "loading" ||
        toppingsStatus === "loading" ? (
          <LoadingPage />
        ) : (
          <Router />
        )}
      </Inner>
      <Footer />
    </>
  );
}

export default App;
