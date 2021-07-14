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
import { unsetCart } from "./features/cart/cartSlice";
import { fetchCart } from "./features/cart/cartAPI";
import { fetchOrders } from "./features/order/ordersAPI";
import { unsetOrders } from "./features/order/ordersSlice";

function App() {
  const dispatch = useAppDispatch();
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const itemsStatus = useAppSelector(selectItemsStatus);
  const toppingsStatus = useAppSelector(selectToppingsStatus);
  const history = useHistory();
  const user = useAppSelector(selectUserInfo);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        dispatch(getUserinfoAsync({ uid: uid }));
        dispatch(fetchCart(uid));
        dispatch(fetchOrders(uid));
      } else {
        dispatch(unsetUser());
        dispatch(unsetCart());
        dispatch(unsetOrders());
      }
    });
    dispatch(fetchAllItemsAsync());
    dispatch(fetchAllToppingsAsync());
  }, []);

  useEffect(() => {
    history.push("/");
  }, [user, history]);

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
