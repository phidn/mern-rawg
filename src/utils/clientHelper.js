import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaLinux,
  FaApple,
  FaAndroid
} from 'react-icons/fa';

const platforms = new Map([
  ['pc', FaWindows],
  ['playstation', FaPlaystation],
  ['xbox', FaXbox],
  ['ios', FaApple],
  ['android', FaAndroid],
  ['linux', FaLinux]
]);

export function getPlatformIcon(slug) {
  return platforms.get(slug);
}

export function elementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const offsetTop = 150;

  return (
    rect.top >= 0 && rect.left >= 0 && rect.top <= windowHeight + offsetTop
  );
}
