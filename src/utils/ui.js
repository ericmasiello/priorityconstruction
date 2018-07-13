/* eslint-disable import/prefer-default-export */

export const hasScrolledPastBottomOfElement = (element) => {
  if (!element || typeof window === 'undefined') {
    return false;
  }
  if (window.pageYOffset + window.innerHeight < element.offsetTop + element.clientHeight) {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return !(
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight + window.pageYOffset) &&
    rect.right <= (window.innerWidth + window.pageXOffset)
  );
};
