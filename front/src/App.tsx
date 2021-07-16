import { useEffect } from "react";
import { Header, Footer, Sidenav } from "./components/organisms";
import Router from "./Router";
import { Inner, LoadingPage, ErrorMessage } from "./components/atoms";

import { auth } from "./apis/firebase/index";

import {
  getUserinfoAsync,
  unsetUser,
  selectUserInfoStatus,
} from "./features/userinfo/userinfoSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  fetchAllItemsAsync,
  selectItemsStatus,
  selectItemsErrorMsg,
} from "./features/item/itemsSlice";
import {
  fetchAllToppingsAsync,
  selectToppingsStatus,
} from "./features/topping/toppingsSlice";
import {
  unsetCart,
  fetchCartAsync,
  selectCartStatus,
} from "./features/cart/cartSlice";
import {
  unsetOrders,
  fetchOrdersAsync,
} from "./features/order/ordersSlice";
import { ADMIN_ID } from "./static/admin";
import {
  getAllUsersAsync,
  selectUserInfosStatus,
} from "./features/userinfos/userinfosSlice";

function App() {
  const dispatch = useAppDispatch();
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const itemsStatus = useAppSelector(selectItemsStatus);
  const itemsError = useAppSelector(selectItemsErrorMsg);
  const toppingsStatus = useAppSelector(selectToppingsStatus);
  const userinfosStatus = useAppSelector(selectUserInfosStatus);
  const cartStatus = useAppSelector(selectCartStatus);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        dispatch(getUserinfoAsync({ uid }));
        dispatch(fetchCartAsync({ uid }));
        dispatch(fetchOrdersAsync({ uid }));
        if (uid === ADMIN_ID) dispatch(getAllUsersAsync());
      } else {
        dispatch(unsetUser());
        dispatch(unsetCart());
        dispatch(unsetOrders());
      }
    });
    dispatch(fetchAllItemsAsync());
    dispatch(fetchAllToppingsAsync());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Sidenav />
      <main style={{ flex: 1 }}>
        <Inner>
          {userinfoStatus === "loading" ||
          itemsStatus === "loading" ||
          toppingsStatus === "loading" ||
          cartStatus === "loading" ||
          userinfosStatus === "loading" ? (
            <LoadingPage />
          ) : itemsStatus === "failed" && itemsError !== null ? (
            <ErrorMessage msg={itemsError} />
          ) : (
            <Router />
          )}
        </Inner>
      </main>
      <Footer />
    </>
  );
}

export default App;
