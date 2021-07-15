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
import { selectUid } from "./features/userinfo/userinfoSlice";
import { useAppSelector } from "./app/hooks";

const Router: FC = () => {
  const uid = useAppSelector(selectUid);
  return (
    <Switch>
      <Route path="/iteminfo/:itemid" exact component={ItemInfo} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/ordercomp" exact component={OrderComp} />
      <Route path="/orderhistory" exact component={OrderHistory} />
      {/* homeをexactにすることで、当てはまるパスがない、という判定にしてAuthまで行かせる。 */}
      <Route path="/" exact component={Home} />
      <AuthGuard uid={uid!}>
        <Route path="/admin/users" exact component={AdminUsers} />
        <Route path="/admin/items" exact component={AdminItems} />
        <Route path="/admin/toppings" exact component={AdminToppings} />
        <Route path="/admin/users/:userid" exact component={AdminUserEdit} />
      </AuthGuard>
    </Switch>
  );
};

export default Router;
