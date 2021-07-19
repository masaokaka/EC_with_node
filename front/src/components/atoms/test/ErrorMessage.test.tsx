import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "..";

describe("ErrorMessage", () => {
  test("エラーを表示する1", () => {
    render(<ErrorMessage msg={"Network Error"} />);
    expect(screen.getByText(/ネットワークエラー/)).toBeInTheDocument();
  });
  test("エラーを表示する2", () => {
    render(<ErrorMessage msg={"password"} />);
    expect(screen.getByText(/パスワード/)).toBeInTheDocument();
  });
  test("エラーを表示する3", () => {
    render(<ErrorMessage msg={"The email address"} />);
    expect(screen.getByText(/メールアドレス/)).toBeInTheDocument();
  });
  test("エラーを表示する4", () => {
    render(<ErrorMessage msg={"no user"} />);
    expect(screen.getByText(/メールアドレス/)).toBeInTheDocument();
  });
  test("エラーを表示する5", () => {
    render(<ErrorMessage msg={"dddddd"} />);
    expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
  });
});
