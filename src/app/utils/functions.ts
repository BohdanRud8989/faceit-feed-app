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
