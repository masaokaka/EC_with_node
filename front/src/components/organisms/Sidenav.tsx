import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import AdminIcon from "@material-ui/icons/SupervisorAccount";
import { selectSidenav, toggle } from "../../app/store/sidenavSlice";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/store/user/userSlice";
import { ADMIN_ID } from "../../state/admin";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
interface SideNavMenuType {
  text: string;
  icon: JSX.Element;
  link: string;
}

const menu = [
  { text: "ホーム", icon: <HomeIcon />, link: "/" },
  { text: "カート", icon: <ShoppingCartIcon />, link: "/cart" },
];
const userMenu = [
  ...menu,
  {
    text: "注文履歴",
    icon: <HistoryIcon />,
    link: "/orderhistory",
  },
];
const adminMenu = [
  ...userMenu,
  {
    text: "管理画面",
    icon: <AdminIcon />,
    link: "/admin",
  },
];

export const Sidenav = () => {
  const toggleState = useSelector(selectSidenav);
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const [menus, setMenus] = useState(menu);

  useEffect(() => {
    if (user.uid === ADMIN_ID) {
      setMenus(adminMenu);
    } else if (user.uid !== null) {
      setMenus(userMenu);
    } else {
      setMenus(menu);
    }
  }, [user]);
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={toggleState}
        onClose={() => {
          dispatch(toggle(false));
        }}
      >
        {toggleState && <SideNavContent menus={menus} />}
      </Drawer>
    </React.Fragment>
  );
};
interface Props {
  menus: SideNavMenuType[];
}
const SideNavContent = ({ menus }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const link = (link: string) => {
    dispatch(toggle(false));
    history.push(link);
  };
  return (
    <div className={classes.list}>
      <List>
        <ListItem>
          <ListItemText primary="メニュー" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {menus.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              link(item.link);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text}></ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
