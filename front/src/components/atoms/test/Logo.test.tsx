import { render, screen } from "@testing-library/react";
import { Logo } from "../";
import { BrowserRouter as Router } from "react-router-dom";

global.window.matchMedia = jest.fn().mockReturnValue({
  matches: true,
  addListener: () => {},
  removeListener: () => {},
});

describe("Logo", () => {
  beforeEach(() => {});
  test("正しく表示されているかテスト", () => {
    render(
      <Router>
        <Logo />
      </Router>
    );
    window.matchMedia("(max-width: 599px)");
    global.innerWidth = 500;
    // expect(screen.getByRole("link")).toBeInTheDocument();
    // expect(screen.getByRole("img")).toBeInTheDocument();
    // screen.debug();
  });
});
