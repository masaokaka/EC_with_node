import React, { useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { ADMIN_ID } from "../../static/admin";
import { AdminUsers } from "../templates/AdminUsers";
import { AdminItems } from "../templates/AdminItems";
import { AdminToppings } from "../templates/AdminToppings";
import { AdminUserEdit } from "../templates/AdminUserEdit";
import { Divider, Box } from "@material-ui/core";
import { IconBtn } from "../atoms";

import { fetchToppings } from "../../features/topping/toppingsAPI";
import { fetchItems } from "../../features/item/itemsAPI";
import { fetchUsersInfo } from "../../features/usersinfo/usersinfoAPI";

const useStyles = makeStyles(() => ({
  link: {
    color: "black",
    "&:hover": {
      color: "orange",
    },
    textDecoration: "none",
  },
}));

const Admin: FC = () => {
  const user = useAppSelector(selectUser);
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const classes = useStyles();

  //マウント時にユーザーがアドミンではなかった場合にはアクセス拒否
  useEffect(() => {
    if (user.uid !== ADMIN_ID) {
      history.push("/");
    } else {
      dispatch(fetchItems());
      dispatch(fetchToppings());
      dispatch(fetchUsersInfo());
    }
  }, []);

  return (
    <React.Fragment>
      <Box>
        <IconBtn icon={"Arrow"} onClk={() => history.push("/")} />
      </Box>
      <Router>
        <ul>
          <li>
            <Link to={`${match.url}/users`} className={classes.link}>
              <p>ユーザー情報</p>
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/items`} className={classes.link}>
              <p>商品情報</p>
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/toppings`} className={classes.link}>
              <p>トッピング情報</p>
            </Link>
          </li>
        </ul>
        <Divider />
        <Switch>
          <Route
            path={`${match.path}/users/:userid`}
            exact
            component={AdminUserEdit}
          />
          <Route path={`${match.path}/items`} exact component={AdminItems} />
          <Route
            path={`${match.path}/toppings`}
            exact
            component={AdminToppings}
          />
          <Route path={`${match.path}`} component={AdminUsers} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default Admin;
