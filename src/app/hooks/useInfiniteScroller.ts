import { useState, useRef, useEffect } from "react";
import { GetPostsQueryArgs } from "../types";
import { DEFAULT_PAGE } from "../utils";

type InfiniteScrollerProps = {
  fetchMoreCallback: ({ page }: GetPostsQueryArgs) => void;
  skip?: boolean;
};

// TODO
/**
 * This hook calculates user engagement on component where it's used
 * @example
 * // returns {isFocused: true, focusedTime: 60, totalTime: 80, engagementPercentage: '75', function(){...}}
 * useEngagementTracker();
 * @returns {{
        isFocused: boolean,
        focusedTime: number,
        totalTime: number,
        engagementPercentage: string,
        resetTracker: () => void,
    }}
 */
export function useInfiniteScroller({
  fetchMoreCallback,
  skip = false,
}: InfiniteScrollerProps) {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const scrollContainerNode = containerRef.current;
    const loaderNode = loaderRef.current;

    if (!scrollContainerNode || !loaderNode || skip) {
      return;
    }

    const options = {
      root: scrollContainerNode,
      rootMargin: "0px",
      threshold: 0.9,
    };

    let previousY = 0;
    let previousRatio = 0;

    const listener: IntersectionObserverCallback = (entries) => {
      entries.forEach(
        ({ isIntersecting, intersectionRatio, boundingClientRect = {} }) => {
          const { y = 0 } = boundingClientRect;
          if (
            isIntersecting &&
            intersectionRatio >= previousRatio &&
            (!previousY || y < previousY)
          ) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMoreCallback({
              page: nextPage,
            });
          }
          previousY = y;
          previousRatio = intersectionRatio;
        },
      );
    };
    //
    const observer = new IntersectionObserver(listener, options);
    observer.observe(loaderNode);

    return () => observer.disconnect();
  }, [page, skip, fetchMoreCallback]);

  return {
    page,
    containerRef,
    loaderRef,
  };
}
