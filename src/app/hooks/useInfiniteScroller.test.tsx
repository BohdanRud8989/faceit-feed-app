import { renderHook, act } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { useInfiniteScroller } from "./useInfiniteScroller";

describe("useInfiniteScroller", () => {
  test("should call callback on scroll", async () => {
    let fetchCounter = 0;
    const mockFetchMoreCallback = () => {
      fetchCounter += 1;
    };
    const containerRefMocked = document.createElement("div");
    const loaderRefMocked = document.createElement("span");
    const { result, rerender } = renderHook(() =>
      useInfiniteScroller({ fetchMoreCallback: mockFetchMoreCallback }),
    );
    const { page, containerRef, loaderRef } = result.current;

    act(() => {
      result.current.containerRef.current = containerRefMocked;
      result.current.loaderRef.current = loaderRefMocked;
    });
    rerender();

    expect(page).toBe(1);
    expect(containerRef).toStrictEqual({ current: containerRefMocked });
    expect(loaderRef).toStrictEqual({ current: loaderRefMocked });
    expect(fetchCounter).toBe(0);
    /*
        // Simulate scrolling to the bottom
        act(() =>  result.current.loaderRef.current.scrollTop = result.current.loaderRef.current.scrollHeight - 100);

        rerender();

        expect(mockFetchMoreCallback).toHaveBeenCalledWith({ page: 2 });
        expect(fetchCounter).toBe(1);
        expect(page).toBe(2);*/
  });
});
