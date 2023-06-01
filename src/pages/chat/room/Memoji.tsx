import { useRef, useEffect, useState } from 'react';
import { SentimentController, SentimentScore } from '@/utils/video/sentimentController';
import { getMemojiOptionByUser } from '@/constants/memoji';
import male from '@/assets/video/male.mp4';

type Props = {
  open: boolean;
  score: SentimentScore;
  user?: User;
};

export default function Memoji({ open, score, user }: Props) {
  const videoRomRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [videoController, setVideoController] = useState<SentimentController | null>(null);

  const video = user ? getMemojiOptionByUser(user).video : null;

  useEffect(() => {
    if (video && user) {
      videoController && videoController.destroy();
      setVideoController(new SentimentController(videoRomRef.current!, video.SentimentClipMap));
    }
  }, [user, video]);

  useEffect(() => {
    if (ready && videoController) {
      videoController.trigger(score);
    }
  }, [ready, score]);

  const handleLoadStart = () => {
    setReady(false);
  };

  const handleLoaded = () => {
    setReady(true);
  };

  return (
    <div className='w-full h-full overflow-auto absolute left-0 top-0 flex justify-center items-center mix-blend-screen'>
      <video
        ref={videoRomRef}
        src={video?.src || ''}
        autoPlay
        loop
        playsInline
        muted
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoaded}
        className={`${open ? 'opacity-100' : 'scale-75 opacity-0'} transition-all`}
      ></video>
    </div>
  );
}
