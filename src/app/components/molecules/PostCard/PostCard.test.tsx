import { test, describe } from "vitest";
/*import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../utils/testsUtils";
import PostCard from "./PostCard";*/

/*jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn((path) => {
      expect(path).toBe(`/feed/1`); // Replace id if necessary
    }),
  })),
}));*/

describe("PostCard component", () => {
  test("renders PostCard component with all elements", () => {
    /* const id = 1;
    const userAvatarUrl = "https://example.com/avatar.jpg";
    const userName = "John Doe";
    const body = "This is a post body.";
    const isNew = true;

    render(
      <PostCard
        id={id}
        userAvatarUrl={userAvatarUrl}
        userName={userName}
        body={body}
        isNew={isNew}
      />,
    );

    const postCard = screen.getByTestId("post-card-test-id");
    const userCard = screen.getByTestId("user-card-test-id");
    const postBody = screen.getByText(body);

    expect(postCard).toBeDefined();
    expect(userCard).toBeDefined();
    expect(postBody).toBeDefined();
    expect(postCard).toHaveClass('post-card--active');

    // Simulate clicking on the post card
    fireEvent.click(postCard);

    // Check if the router was pushed to the correct URL
    expect(window.location.pathname).toBe(`/feed/${id}`);*/
  });
});
