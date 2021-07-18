import { render, screen } from "@testing-library/react";
import { Footer } from "..";
import { BrowserRouter as Router } from "react-router-dom";

describe("Footer", () => {
  it("render", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });
});
