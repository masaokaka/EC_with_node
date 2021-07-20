import { render, screen } from "@testing-library/react";
import UserEdit from "../UserEdit";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../app/store";
import { Provider } from "react-redux";

describe("admin/useredit", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <UserEdit />
        </Router>
      </Provider>
    );
  });
});
