import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "..";

describe("ErrorMessage", () => {
  beforeEach(() => {
    render(<ErrorMessage msg={"Network Error"} />);
  });
  test("エラーを表示する", () => {
    expect(screen.getByText(/ネットワークエラー/)).toBeInTheDocument();
  });
});
