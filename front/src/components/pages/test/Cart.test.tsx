import { render, screen } from "@testing-library/react";
import { Cart } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe("Cart", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );
  });
});
