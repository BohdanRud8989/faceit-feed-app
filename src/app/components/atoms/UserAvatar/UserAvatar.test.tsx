import { render, screen } from "@testing-library/react";
import UserCard from "./LoginButton";

describe("LoginButton component", () => {
  it("should render LoginButton component correctly", () => {
    render(<UserCard> Login </UserCard>);
    const element = screen.getByText("Login");
    expect(element).toBeInTheDocument();
  });

  it("should display loading state when the component is being loaded", () => {
    render(<UserCard loading />);
    const element = screen.getByText("Logging in...");
    expect(element).toBeInTheDocument();
  });

  it("should be disabled", () => {
    render(<UserCard disabled />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("disabled");
  });
});
