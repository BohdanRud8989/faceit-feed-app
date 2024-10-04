import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("should render Header component correctly", () => {
    render(<Header label="Label" id="some-id" />);
    const label = screen.getByLabelText("User setting");

    expect(label).toBeInTheDocument();
  });
});
