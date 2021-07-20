import { render, screen } from "@testing-library/react";
import Users from "../Users";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../app/store";
import { Provider } from "react-redux";

describe("admin/users", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <Users />
        </Router>
      </Provider>
    );
  });
});
