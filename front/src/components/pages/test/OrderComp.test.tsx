import { render, screen } from "@testing-library/react";
import { OrderComp } from "..";
import { BrowserRouter as Router } from "react-router-dom";

describe("OrderComp", () => {
  it("render", () => {
    render(
      <Router>
        <OrderComp />
      </Router>
    );
    expect(screen.getByText("注文が完了しました！")).toBeInTheDocument();
  });
});
