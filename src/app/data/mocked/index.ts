import { faker } from "@faker-js/faker";
import { Post } from "../../types";

const getMockedPost = (index: number) => ({
  id: index,
  isNew: false,
  userAvatarUrl: faker.image.avatar(),
  userName: faker.person.fullName(),
  body: faker.lorem.paragraph(5),
});

export const mockedPosts: Post[] = Array.from({ length: 25 }, (_, index) =>
  getMockedPost(index + 1),
);

export const getRandomMockedPost = () => {
  if (mockedPosts.length >= 10) {
    const randomIndex = Math.floor(Math.random() * mockedPosts.length);
    return mockedPosts[randomIndex];
  }

  const randomPost = getMockedPost(Math.floor(Math.random() * 10000));
  mockedPosts.push(randomPost);
  return randomPost;
};
