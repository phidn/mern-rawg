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

export const getPlatformIcon = (slug) => {
  return platforms.get(slug);
}

export const elementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const offsetTop = 150;

  return (
    rect.top >= 0 && rect.left >= 0 && rect.top <= windowHeight + offsetTop
  );
}

export const formatImageUrl = (url) => {
  let urlObj = new URL(url);
  return urlObj.pathname.replace("/media","https://media.rawg.io/media/crop/600/400");
}

export const getColumnNumber = () => {
  if(window.innerWidth>=1200) return 4;
  if(window.innerWidth>=992) return 3
  if(window.innerWidth>=768) return 2;
  if(window.innerWidth<768) return 1;
}
