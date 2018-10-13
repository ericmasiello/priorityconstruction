/* eslint-disable import/prefer-default-export */
export function take(qty) {
  return function takeItems(items = []) {
    return items.slice(0, qty);
  };
}
