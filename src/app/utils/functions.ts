import { PREV_SCROLL_POSITION_KEY } from "./constants";

/**
 * Key generator - create unique keys while iterating over the array
 * @example
 * const itemKeyGenerator = keyMaker("ANY_PREFIX");
 * {items.map((item) =>
 *           <ItemCard key={itemKeyGenerator.next().value} {...item} />
 *       )}
 * @returns {void}
 */
export function* keyMaker(prefix: string): Generator<string, string, void> {
  let index = 0;
  while (true) {
    yield `${prefix}_${(index += 1)}`;
  }
}

export function getPrevScrollPosition() {
  return Number(window.localStorage.getItem(PREV_SCROLL_POSITION_KEY));
}

export function setPrevScrollPosition(position: number) {
  window.localStorage.setItem(PREV_SCROLL_POSITION_KEY, String(position));
}
