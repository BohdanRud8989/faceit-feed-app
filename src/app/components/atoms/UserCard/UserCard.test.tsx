import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import UserCard from "./UserCard";

describe("UserCard component", () => {
  test("renders UserCard with image and name", () => {
    const url = "https://example.com/avatar.jpg";
    const name = "John Doe";

    render(<UserCard avatarUrl={url} name={name} />);

    const image = screen.getByRole("img");
    const nameElement = screen.getByText(name);

    expect(image).toBeDefined();
    expect(image.src).toContain("example.com");
    expect(nameElement).toBeDefined();
  });

  test("renders UserCard with initials and name", () => {
    const name = "John Doe";

    render(<UserCard name={name} />);

    const initials = screen.getByText("JD");
    const nameElement = screen.queryAllByText(name);

    expect(initials).toBeDefined();
    expect(nameElement).toBeDefined();
  });

  test("renders UserCard in portrait mode", () => {
    const url = "https://example.com/avatar.jpg";
    const name = "John Doe";

    render(<UserCard url={url} name={name} portrait />);

    // Check if the user card element has the "user-card--portrait" class
    const userCard = screen.getAllByTestId("user-card-test-id");
    expect(userCard[0]).toHaveClass("user-card--portrait");
  });
});
