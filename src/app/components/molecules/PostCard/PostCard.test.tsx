import { render, screen } from "@testing-library/react";
import PostCard from "./UserCard";

describe("UserCard component", () => {
  it("should render UserCard component correctly", () => {
    render(<PostCard />);
    const firstLabel = screen.getByLabelText("First Name:");
    const secondLabel = screen.getByLabelText("Last Name:");

    expect(firstLabel).toBeInTheDocument();
    expect(secondLabel).toBeInTheDocument();
  });

  it("should display all user info not only labels", () => {
    render(<PostCard firstName="Bohdan" lastName="Rud" />);
    const firstInput = screen.getByLabelText("First Name:");
    const secondInput = screen.getByLabelText("Last Name:");

    expect(firstInput).toHaveValue("Bohdan");
    expect(secondInput).toHaveValue("Rud");
  });
});
