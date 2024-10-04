import { Post } from "../../types";

const getMockedPost = (index: number) => ({
  id: index,
  isNew: false,
  userAvatarUrl: "",
  userName: "Bohdan Rud",
  body:
    "Bruno Fernandes sees red in game between Manchester United and Tottenham. " +
    "Bruno Fernandes sees red in game between Manchester United and Tottenham",
});

export const mockedPosts: Post[] = Array.from({ length: 25 }, (_, index) =>
  getMockedPost(index + 1),
);

export const getRandomMockedPost = () => {
  const randomIndex = Math.floor(Math.random() * 1000000);
  return getMockedPost(randomIndex);
};
