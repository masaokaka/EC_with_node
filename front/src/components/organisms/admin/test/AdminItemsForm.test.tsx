import { render, screen } from "@testing-library/react";
import AdminItemsForm from "../AdminItemsForm";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../app/store";
import { Provider } from "react-redux";

let testItem = {
  _id: "wecrwv4",
  name: "カレー",
  text: "美味しいカレーです",
  mprice: 2000,
  lprice: 3000,
  img: "URL",
};
let testItems = [testItem];

describe("AdminToppingsForm", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <AdminItemsForm items={testItems} />
        </Router>
      </Provider>
    );
  });
});
