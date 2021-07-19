import { render, screen } from "@testing-library/react";
import AdminUsersTable from "../AdminUsersTable";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../app/store";
import { Provider } from "react-redux";
import { ADMIN_ID } from "../../../../static/admin";

let testUserInfo = {
  uid: ADMIN_ID,
  name: "テスト太郎",
  zipcode: "000-0000",
  address: "東京都",
  email: "aa@aa.com",
  tel: "000-0000-0000",
  username: "テストユーザー",
};

let testUserInfos = [testUserInfo];

describe("AdminUsersTable", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <AdminUsersTable userInfos={testUserInfos} />
        </Router>
      </Provider>
    );
  });
});
