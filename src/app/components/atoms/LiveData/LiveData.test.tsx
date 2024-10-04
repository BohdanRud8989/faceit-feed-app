import { render, screen } from "@testing-library/react";
import Header from "./FormItem";

describe("FormItem component", () => {
  it("should render FormItem component correctly", () => {
    render(<Header label="Label" id="some-id" />);
    const label = screen.getByLabelText("Label:");

    expect(label).toHaveAttribute("disabled");
    expect(label).toBeInTheDocument();
  });

  it("should have provided value", () => {
    render(<Header label="Label" value="Initial value" id="some-id" />);
    const input = screen.getByLabelText("Label:");

    expect(input).toHaveValue("Initial value");
  });
});
