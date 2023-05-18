import { useEffect } from 'react';
import SessionBar from './sessionBar';
import Room from './room';
import { useStore } from '@/store';

export default function index() {
  const { setSocketMessageList } = useStore(state => state);

  useEffect(() => {
    return () => {
      setSocketMessageList([]);
    };
  }, []);

  return (
    <div className='flex justify-between bg-primary-bg'>
      <SessionBar />
      <Room />
    </div>
  );
}
