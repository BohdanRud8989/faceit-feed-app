import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import UserAvatar from "./UserAvatar";
import { AVATAR_SIZES_MAP } from "../../../utils";

describe("UserAvatar component", () => {
  test("renders UserAvatar with initials", () => {
    const fullName = "John Doe";
    const size = "small";

    render(<UserAvatar fullName={fullName} size={size} />);

    const initials = screen.getByText("JD");
    const image = screen.queryByRole("img");
    expect(initials).toBeDefined();
    expect(image).toBeNull();
  });

  test("renders UserAvatar with image", () => {
    const url = "https://example.com/avatar.jpg";
    const fullName = "John Doe";
    const size = "large";

    render(<UserAvatar url={url} fullName={fullName} size={size} />);

    const image = screen.getByRole("img");
    expect(image).toBeDefined();
    expect(image.src).toContain("example.com");
    expect(image.alt).toBe(`${fullName} avatar`);
    expect(image.width).toBe(AVATAR_SIZES_MAP[size]);
    expect(image.height).toBe(AVATAR_SIZES_MAP[size]);
  });
});
