import { render, screen } from "@testing-library/react";
import { Sidenav } from "..";
import { SideNavContent } from "../Sidenav";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import AdminIcon from "@material-ui/icons/SupervisorAccount";
import { ADMIN_ID } from "../../../static/admin";

interface SideNavMenuType {
  text: string;
  icon: JSX.Element;
  link: string;
}

const menu: SideNavMenuType[] = [
  { text: "ホーム", icon: <HomeIcon />, link: "/" },
  { text: "カート", icon: <ShoppingCartIcon />, link: "/cart" },
];
const userMenu: SideNavMenuType[] = [
  { text: "ホーム", icon: <HomeIcon />, link: "/" },
  { text: "カート", icon: <ShoppingCartIcon />, link: "/cart" },
  {
    text: "注文履歴",
    icon: <HistoryIcon />,
    link: "/orderhistory",
  },
];
const adminMenu: SideNavMenuType[] = [
  ...userMenu,
  {
    text: "管理画面",
    icon: <AdminIcon />,
    link: "/admin/users",
  },
];

describe("Sidenav", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidenav />
        </Router>
      </Provider>
    );
  });
  it("render no user content", () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidenav>
            <SideNavContent menus={menu} uid={undefined} />
          </Sidenav>
        </Router>
      </Provider>
    );
  });
  it("render user content", () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidenav>
            <SideNavContent menus={userMenu} uid={"frevberbe4rv"} />
          </Sidenav>
        </Router>
      </Provider>
    );
  });
  it("render admin content", () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidenav>
            <SideNavContent menus={adminMenu} uid={ADMIN_ID} />
          </Sidenav>
        </Router>
      </Provider>
    );
  });
});
