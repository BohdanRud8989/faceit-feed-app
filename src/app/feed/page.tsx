"use client";

import { useGetPostsQuery, useGetMorePostsMutation } from "../data";
import { FeedSection } from "../components";
import { useInfiniteScroller } from "../hooks";
import { DEFAULT_PAGE } from "../utils";

import "./page.scss";

/**
 * Posts Feed with infinite scroller
 * @returns {JSX.Element}
 */
const PostsFeed = () => {
  const {
    data: posts,
    error,
    isFetching: arePostsLoading,
  } = useGetPostsQuery({
    page: DEFAULT_PAGE,
  });
  const [
    getMorePosts,
    { isLoading: areMorePostsLoading, data: morePosts, isUninitialized },
  ] = useGetMorePostsMutation();
  const { containerRef, loaderRef } = useInfiniteScroller({
    fetchMoreCallback: getMorePosts,
    skip:
      posts === undefined ||
      posts?.length === 0 ||
      areMorePostsLoading ||
      morePosts?.length === 0,
  });

  if (arePostsLoading) {
    return (
      <h6 className="posts-feed__notification">
        Please wait, feed is being loaded...
      </h6>
    );
  }
  if (error) {
    return (
      <h6 className="posts-feed__notification posts-feed__notification--error">
        Failed to load feed: {(error as { status: string }).status}
      </h6>
    );
  }
  if (!posts?.length) {
    return (
      <h6 className="posts-feed__notification">No posts found in the feed.</h6>
    );
  }

  return (
    <div className="posts-feed" ref={containerRef}>
      <FeedSection posts={posts} />
      {((isUninitialized && posts !== undefined && posts.length > 0) ||
        (!isUninitialized &&
          morePosts !== undefined &&
          morePosts.length > 0)) && (
        <span className="posts-feed__notification" ref={loaderRef}>
          Loading...
        </span>
      )}
    </div>
  );
};

export default PostsFeed;
