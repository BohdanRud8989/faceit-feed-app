import feedApi from "./feedApi";
import { GetPostsQueryArgs } from "../../types";
import { getRandomMockedPost } from "../mocked";

/**
 * Pushes random post to the RTK cache
 * @returns {void}
 */
export const addNewPostAction = () => {
  return feedApi.util.updateQueryData(
    "getPosts",
    {} as GetPostsQueryArgs,
    (cachedData) => {
      cachedData.forEach((cachedPost) => {
        cachedPost["isNew"] = false;
      });
      cachedData.unshift({ ...getRandomMockedPost(), isNew: true });

      return cachedData;
    },
  );
};
