import { PostCard } from "../../molecules";
import { Post } from "../../../types";
import { keyMaker } from "../../../utils";

import "./feedSection.scss";

type FeedSectionProps = {
  posts: Post[];
};
const POST_PREFIX = "POST";

/**
 * Feed Section
 * @param {Post[]} posts - Posts list to display
 * @returns {JSX.Element}
 */
const FeedSection = ({ posts }: FeedSectionProps) => {
  const postKeyGenerator = keyMaker(POST_PREFIX);

  return (
    <div className="feed-section">
      {posts.map((post) => (
        <PostCard key={postKeyGenerator.next().value} {...post} />
      ))}
    </div>
  );
};

export default FeedSection;
