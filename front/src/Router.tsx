import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ItemInfo,
  Cart,
  OrderComp,
  OrderHistory,
  Admin,
} from "./components/pages";

const Router: FC = () => {
  return (
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
  );
};

export default Router;
