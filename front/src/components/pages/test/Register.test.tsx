import { render, screen } from "@testing-library/react";
import { Register } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe("Register", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
  });
});
