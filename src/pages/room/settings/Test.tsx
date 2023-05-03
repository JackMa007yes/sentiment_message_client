import { useEffect, useState } from 'react';

function Dong() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count => count + 1);
    }, 500);
  }, []);

  useEffect(() => {
    setInterval(() => {
      console.log(count);
    }, 500);
  }, []);

  return <div>{count}</div>;
}

export default Dong;
