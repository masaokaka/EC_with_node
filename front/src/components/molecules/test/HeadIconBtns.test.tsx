import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import { HeadIconBtns } from "../";
import { ADMIN_ID } from "../../../static/admin";

describe("HeadIconBtns", () => {
  describe("表示テスト", () => {
    test("管理者の場合でログインしている場合", () => {
      render(
        <Provider store={store}>
          <Router>
            <HeadIconBtns uid={ADMIN_ID} />
          </Router>
        </Provider>
      );
      expect(screen.getAllByRole("button")).toHaveLength(4);
      // screen.debug();
    });
    test("一般ユーザーの場合でログインしている場合", () => {
      render(
        <Provider store={store}>
          <Router>
            <HeadIconBtns uid={"aaaaaaaaaaaaa"} />
          </Router>
        </Provider>
      );
      expect(screen.getAllByRole("button")).toHaveLength(3);
      // screen.debug();
    });
    test("登録していないユーザーの場合", () => {
      render(
        <Provider store={store}>
          <Router>
            <HeadIconBtns uid={undefined} />
          </Router>
        </Provider>
      );
      expect(screen.getAllByRole("button")).toHaveLength(2);
      // screen.debug();
    });
  });
  describe("ボタンクリック動作テスト", () => {
    test("ログイン時のボタンがクリックされているかのテスト", () => {
      render(
        <Provider store={store}>
          <Router>
            <HeadIconBtns uid={ADMIN_ID} />
          </Router>
        </Provider>
      );
      let btn1 = screen.getAllByRole("button")[0];
      let btn2 = screen.getAllByRole("button")[1];
      let btn3 = screen.getAllByRole("button")[2];
      let btn4 = screen.getAllByRole("button")[3];
      fireEvent.click(btn1);
      fireEvent.click(btn2);
      fireEvent.click(btn3);
      fireEvent.click(btn4);
    });
    test("ログアウト時のボタンがクリックされているかのテスト", () => {
      render(
        <Provider store={store}>
          <Router>
            <HeadIconBtns uid={undefined} />
          </Router>
        </Provider>
      );
      let btn1 = screen.getAllByRole("button")[1];
      fireEvent.click(btn1);
    });
  });
});
