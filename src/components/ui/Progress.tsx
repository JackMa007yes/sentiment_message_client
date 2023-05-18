import { useEffect } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import '@/styles/resetProgress.css';

const Progress = () => {
  useEffect(() => {
    nprogress.start();

    return () => {
      nprogress.done();
    };
  }, []);

  return <></>;
};

export default Progress;
