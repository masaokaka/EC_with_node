import { render, screen } from "@testing-library/react";
import Toppings from "../Toppings";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../app/store";
import { Provider } from "react-redux";

describe("admin/toppings", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <Toppings />
        </Router>
      </Provider>
    );
  });
});
