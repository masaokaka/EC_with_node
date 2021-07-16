import { useEffect } from "react";
import { Header, Footer, Sidenav } from "./components/organisms";
import Router from "./Router";
import { Inner, LoadingPage } from "./components/atoms";

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
} from "./features/item/itemsSlice";
import {
  fetchAllToppingsAsync,
  selectToppingsStatus,
} from "./features/topping/toppingsSlice";
import { unsetCart, fetchCartAsync } from "./features/cart/cartSlice";
import { unsetOrders, fetchOrdersAsync } from "./features/order/ordersSlice";
import { ADMIN_ID } from "./static/admin";
import { getAllUsersAsync } from "./features/userinfos/userinfosSlice";

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
        if (uid === ADMIN_ID) dispatch(getAllUsersAsync());
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
      <main style={{ flex: 1 }}>
        <Inner>
          {userinfoStatus === "loading" ||
          itemsStatus === "loading" ||
          toppingsStatus === "loading" ? (
            <LoadingPage />
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
