import { render, screen } from "@testing-library/react";
import { AuthGuard } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { ADMIN_ID } from "../../../static/admin";

describe("AuthGuard", () => {
  test("管理者がログインしていた場合、中身を表示する", () => {
    render(
      <Router>
        <AuthGuard uid={ADMIN_ID}>
          <div>テスト</div>
        </AuthGuard>
      </Router>
    );
    expect(screen.getByText("テスト")).toBeInTheDocument();
  });
  test("管理者意外がログインしていた場合中身を表示しない", () => {
    render(
      <Router>
        <AuthGuard uid={"aaaaaaaa"}>
          <div>テスト</div>
        </AuthGuard>
      </Router>
    );
    expect(screen.queryByText("テスト")).toBeNull();
  });
  test("一般ユーザがの場合中身を表示しない", () => {
    render(
      <Router>
        <AuthGuard uid={undefined}>
          <div>テスト</div>
        </AuthGuard>
      </Router>
    );
    expect(screen.queryByText("テスト")).toBeNull();
  });
});
