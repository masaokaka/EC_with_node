import { render, screen } from "@testing-library/react";
import { LoadingPage } from "../";

describe("LoadingPage", () => {
  test("正しく表示されているかテスト", () => {
    render(<LoadingPage />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
