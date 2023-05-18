import girl1 from '@/assets/img/girl_1.jpg';
import boy1 from '@/assets/img/boy_1.jpg';
import boy2 from '@/assets/img/boy_2.jpg';
import fox from '@/assets/img/fox.jpg';
import maleVideo from '@/assets/video/male.mp4';
import { Button } from '@mui/material';

const OptionList = [
  {
    img: girl1,
    video: null,
    value: 0
  },
  {
    img: boy1,
    video: null,
    value: 1
  },
  {
    img: boy2,
    video: null,
    value: 2
  },
  {
    img: fox,
    video: null,
    value: 3
  }
];

export default function memojiSetting() {
  return (
    <div className='py-8 gap-6 flex-col items-center w-full h-full'>
      <section className='flex gap-5 justify-center'>
        {OptionList.map(item => {
          return (
            <div
              key={item.value}
              className='w-32 h-32 overflow-hidden border-primary-text rounded-2xl border-2 cursor-pointer flex justify-center items-center mb-6 bg-[#1c1c1e]'
            >
              <img src={item.img} alt='' className='w-24 hover:scale-105'></img>
            </div>
          );
        })}
      </section>
      <section className='bg-black flex-1 flex justify-center h-[calc(60vh)]'>
        <video src={maleVideo} autoPlay muted></video>
      </section>
      <Button variant='outlined'>Confirm</Button>
    </div>
  );
}
