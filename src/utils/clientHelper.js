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
