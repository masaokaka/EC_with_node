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
  AdminItems,
  AdminToppings,
  AdminUserEdit,
  AdminUsers,
} from "./components/pages";
import { AuthGuard } from "./components/atoms";

const Router: FC = () => {
  return (
    <Switch>
      <Route path="/iteminfo/:itemid" exact component={ItemInfo} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/ordercomp" exact component={OrderComp} />
      <Route path="/orderhistory" exact component={OrderHistory} />
      <Route path="/" component={Home} />
      <AuthGuard>
        <Switch>
          <Route path="/admin/users" exact component={AdminUsers} />
          <Route path="/admin/items" exact component={AdminItems} />
          <Route path="/admin/toppings" exact component={AdminToppings} />
          <Route path="/admin/users/:userid" exact component={AdminUserEdit} />
        </Switch>
      </AuthGuard>
    </Switch>
  );
};

export default Router;
