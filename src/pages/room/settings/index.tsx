import { Height, Settings } from '@mui/icons-material';
import { useRef } from 'react';
import { motion, sync, useCycle } from 'framer-motion';
import { useSize } from 'ahooks';
import AddUserModal from '@/components/AddUserModal';
import Upload from 'rc-upload';
import { getToken } from '@/api/http';
import Dong from './Test';

const props = {
  action: '/api/user/avatar',
  headers: {
    authorization: (() => {
      return getToken();
    })()
  },
  multiple: false,
  onStart(file: { name: any }) {
    console.log('onStart', file, file.name);
  },
  onSuccess(ret: any) {
    console.log('onSuccess', ret);
  },
  onError(err: any) {
    console.log('onError', err);
  }
};

export default function index() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const size = useSize(document.querySelector('body'));

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 40,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: `circle(0px at 48px ${size!.height - 80}px)`,
      transition: {
        delay: 0,
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    // <div className='flex flex-col justify-center items-center gap-3 cursor-pointer'>
    //   <Settings sx={{ fontSize: 34, color: '#a9adb9' }}></Settings>
    //   <section className='text-icon-color text-xs'>Setting</section>
    // </div>
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} ref={containerRef} className='z-10'>
      <motion.div className='bg-primary-color w-screen h-screen absolute left-0 top-0 p-10' variants={sidebar}>
        <section className='p-10'>
          <div id='a'></div>
          {/* <AddUserModal /> */}
          <Upload {...props}>
            <a>开始上传</a>
          </Upload>
        </section>
      </motion.div>
      <div
        className='flex flex-col justify-center items-center gap-3 cursor-pointer bottom-10 absolute left-7'
        onClick={() => toggleOpen()}
      >
        <Settings sx={{ fontSize: 34, color: '#a9adb9' }}></Settings>
        <section className='text-icon-color text-xs'>Setting</section>
      </div>
    </motion.nav>
  );
}
