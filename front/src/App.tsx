import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { Sidenav } from "./components/organisms/Sidenav";
import Router from "./Router";
import { Inner } from "./components/atoms";

import "./App.css";
import { auth } from "./apis/firebase/index";

import { selectUser, setUser, unsetUser } from "./features/user/userSlice";
import { useAppSelector } from "./app/hooks";
import { fetchItems } from "./features/item/itemsAPI";
import { fetchToppings } from "./features/topping/toppingsAPI";
import { unsetCart } from "./features/cart/cartSlice";
import { fetchCart } from "./features/cart/cartAPI";
import { fetchUserInfo } from "./features/userinfo/userinfoAPI";
import { unsetUserInfo } from "./features/userinfo/userinfoSlice";
import { fetchOrders } from "./features/order/ordersAPI";
import { unsetOrders } from "./features/order/ordersSlice";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        let name = user.displayName;
        dispatch(setUser({ uid, name }));
        dispatch(fetchUserInfo(user.uid));
        dispatch(fetchCart(uid));
        dispatch(fetchOrders(uid));
      } else {
        dispatch(unsetUser());
        dispatch(unsetUserInfo());
        dispatch(unsetCart());
        dispatch(unsetOrders());
      }
    });
    dispatch(fetchItems());
    dispatch(fetchToppings());
  }, []);

  useEffect(() => {
    history.push("/");
  }, [user, history]);

  return (
    <>
      <Header />
      <Sidenav />
      <Inner>
        <Router />
      </Inner>
      <Footer />
    </>
  );
}

export default App;
