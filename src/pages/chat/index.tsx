import { useEffect } from 'react';
import { useStore } from '@/store';
import { useIsPC } from '@/hooks/useIsPC';
import PCChat from '../PC/chat';
import MobileChat from '../mobile/chat';

export default function index() {
  const { setSocketMessageList } = useStore(state => state);
  const isPC = useIsPC();

  useEffect(() => {
    return () => {
      setSocketMessageList([]);
    };
  }, []);

  return isPC ? <PCChat /> : <MobileChat />;
}
