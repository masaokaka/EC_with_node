import { render, screen } from "@testing-library/react";
import { OrderHistory } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe("OrderHistory", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <OrderHistory />
        </Router>
      </Provider>
    );
  });
});
