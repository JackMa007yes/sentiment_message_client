import { useMedia } from 'react-use';

export const useIsPC = () => {
  const isWide = useMedia('(min-width: 480px)');

  return isWide;
};
