import { useState, useRef, useEffect } from "react";
import { clearTimeout, setTimeout } from "timers";
import { GetPostsQueryArgs } from "../types";
import { DEFAULT_PAGE } from "../utils";

type InfiniteScrollerProps = {
  fetchMoreCallback: ({ page }: GetPostsQueryArgs) => void;
  skip?: boolean;
};

/**
 * This hook attaches infinite scroller for exposed props: "containerRef", "loaderRef"
 * and performs callback method call on each scroll
 * @param {({ page }: GetPostsQueryArgs) => void} fetchMoreCallback - Callback to fetch more data
 * @param {boolean} skip - Whether to skip scrolling
 * @example
 * // returns {page: 1, containerRef: MutableRefObject, loaderRef: MutableRefObject}
 * useInfiniteScroller({
    fetchMoreCallback: getMoreItems,
    skip: false,
  }
 * @returns {{
        page: number,
        containerRef: React.MutableRefObject,
        loaderRef: React.MutableRefObject
    }}
 */
export function useInfiniteScroller({
  fetchMoreCallback,
  skip = false,
}: InfiniteScrollerProps) {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLSpanElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

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
            timeoutRef.current = setTimeout(() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchMoreCallback({
                page: nextPage,
              });
            }, 500);
          }
          previousY = y;
          previousRatio = intersectionRatio;
        },
      );
    };
    //
    const observer = new IntersectionObserver(listener, options);
    observer.observe(loaderNode);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [page, skip, fetchMoreCallback]);

  return {
    page,
    containerRef,
    loaderRef,
  };
}
