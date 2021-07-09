import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { Sidenav } from "./components/organisms/Sidenav";
import Container from "@material-ui/core/Container";
// import ScrollToTop from "./features/ScrollToTop";
import "./App.css";
import { auth } from "./lib/firebase/index";

import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { ItemInfo } from "./components/pages/ItemInfo";
import { Cart } from "./components/pages/Cart";
import { OrderHistory } from "./components/pages/OrderHistory";
import { OrderComp } from "./components/pages/OrderComp";
import { Admin } from "./components/pages/Admin";
import { selectUser, setUser, unsetUser } from "./app/store/user/userSlice";
import { useAppSelector } from "./app/hooks";
import { fetchItems } from "./app/store/item/itemsOperation";
import { fetchToppings } from "./app/store/topping/toppingsOperation";
import { unsetCart } from "./app/store/cart/cartSlice";
import { fetchCart } from "./app/store/cart/cartOperation";
import { fetchUserInfo } from "./app/store/userinfo/userinfoOperation";
import { unsetUserInfo } from "./app/store/userinfo/userinfoSlice";
import { fetchOrders } from "./app/store/order/ordersOperation";
import { unsetOrders } from "./app/store/order/ordersSlice";

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
  }, [user]);

  return (
    <div style={{ minHeight: "100%", minWidth: "100%", overflow: "hidden" }}>
      <Header />
      <Sidenav />
      <Container
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        {/* <ScrollToTop> */}
        <Switch>
          <Route path="/iteminfo/:itemid" exact component={ItemInfo} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/ordercomp" exact component={OrderComp} />
          <Route path="/orderhistory" exact component={OrderHistory} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/" component={Home} />
        </Switch>
        {/* </ScrollToTop> */}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
