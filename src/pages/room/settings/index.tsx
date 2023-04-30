import { Height, Settings } from '@mui/icons-material';
import { useRef } from 'react';
import { motion, sync, useCycle } from 'framer-motion';

export default function index() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: (height = 800) => {
      console.log(height, 7777);
      return {
        clipPath: `circle(0px at 40px ${height - 20}px)`,
        transition: {
          delay: 0,
          type: 'spring',
          stiffness: 400,
          damping: 40
        }
      };
    }
  };
  console.log(isOpen);

  return (
    // <div className='flex flex-col justify-center items-center gap-3 cursor-pointer'>
    //   <Settings sx={{ fontSize: 34, color: '#a9adb9' }}></Settings>
    //   <section className='text-icon-color text-xs'>Setting</section>
    // </div>
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} ref={containerRef} className='z-10'>
      <motion.div className='bg-primary-color w-screen h-screen absolute left-0 top-0 p-10' variants={sidebar}>
        hhahaah
      </motion.div>
      <div
        className='flex flex-col justify-center items-center gap-3 cursor-pointer bottom-10 absolute'
        onClick={() => toggleOpen()}
      >
        <Settings sx={{ fontSize: 34, color: '#a9adb9' }}></Settings>
        <section className='text-icon-color text-xs'>Setting</section>
      </div>
    </motion.nav>
  );
}
