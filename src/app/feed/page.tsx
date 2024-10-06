"use client";

import { useEffect } from "react";
import { useGetPostsQuery, useGetMorePostsMutation } from "../data";
import { FeedSection } from "../components";
import { useInfiniteScroller, useDebounce } from "../hooks";
import {
  DEFAULT_PAGE,
  getPrevScrollPosition,
  setPrevScrollPosition,
} from "../utils";

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
  const hasMorePosts =
    (isUninitialized && posts !== undefined && posts.length > 0) ||
    (!isUninitialized && morePosts !== undefined && morePosts.length > 0);

  // Read and set previous scroll position once as component has been mounted
  useEffect(() => {
    const prevScrollPosition = getPrevScrollPosition();
    if (!prevScrollPosition || !containerRef.current) {
      return;
    }

    containerRef.current.scrollTo(0, prevScrollPosition);
  }, [containerRef]);

  const debouncedScroll = useDebounce(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const { target }: React.BaseSyntheticEvent = e;
      setPrevScrollPosition(target.scrollTop);
    },
    500,
  );

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
      <h6 className="posts-feed__notification">
        Your feed is empty. New interesting content is coming!
      </h6>
    );
  }

  return (
    <div className="posts-feed" ref={containerRef} onScroll={debouncedScroll}>
      <FeedSection posts={posts} />
      {hasMorePosts && (
        <span className="posts-feed__notification" ref={loaderRef}>
          Loading...
        </span>
      )}
    </div>
  );
};

export default PostsFeed;
