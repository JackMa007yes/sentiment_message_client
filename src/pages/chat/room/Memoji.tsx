import { useRef, useEffect, useState } from 'react';
import { MaleVideoSource } from '@/constants/video';
import { SentimentController, SentimentScore } from '@/utils/video/sentimentController';

type Props = {
  open: boolean;
  score: SentimentScore;
};

export default function Memoji({ open, score }: Props) {
  const videoRomRef = useRef<HTMLVideoElement | null>(null);
  const [videoController, setVideoController] = useState<SentimentController | null>(null);

  videoController && videoController.trigger(score);

  useEffect(() => {
    setVideoController(new SentimentController(videoRomRef.current!, MaleVideoSource.SentimentClipMap));
  }, []);

  return (
    <div className='w-full h-full overflow-auto absolute left-0 top-0 flex justify-center items-center mix-blend-screen'>
      <video
        ref={videoRomRef}
        src={MaleVideoSource.video}
        muted={true}
        className={`${open ? 'opacity-100' : 'scale-75 opacity-0'} transition-all`}
      ></video>
    </div>
  );
}
