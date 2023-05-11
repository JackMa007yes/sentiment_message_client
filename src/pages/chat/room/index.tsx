import { memo, useEffect, useRef, useState } from 'react';
import { SentimentController, SentimentScore } from '@/utils/video/sentimentController';
import Input from './Input';
import { useStore } from '@/store';
import { MaleVideoSource } from '@/constants/video';
import { IconButton, Switch } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import Avatar from '@/components/ui/Avatar';
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp';
import SentimentVerySatisfiedSharpIcon from '@mui/icons-material/SentimentVerySatisfiedSharp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import emojiIcon from '@/assets/icon/happy.svg';
import emojiHiddenIcon from '@/assets/icon/close_eye.svg';
import Messages from './Messages';

type Props = {
  onSend: (message: any) => void;
  socketMessageList: IMessage[];
};
function Room({ onSend, socketMessageList }: Props) {
  const { session } = useStore(state => state);
  const [memojiDisplay, setMemojiDisplay] = useState(true);
  const [videoController, setVideoController] = useState<SentimentController | null>(null);
  const [sentimentScore, setSentimentScore] = useState<SentimentScore>(SentimentScore.peaceful);
  const videoRomRef = useRef<HTMLVideoElement | null>(null);

  const sendMessage = (val: string) => {
    onSend({
      type: 'addMessage',
      payload: {
        roomId: session?.room.id,
        userId: session?.fromUser.id,
        message: val
      }
    });
  };

  useEffect(() => {
    videoController && videoController.trigger(sentimentScore);
  }, [sentimentScore, videoController]);

  useEffect(() => {
    setVideoController(new SentimentController(videoRomRef.current!, MaleVideoSource.SentimentClipMap));
  }, []);
  console.log(55555);

  return (
    <div className='mr-8 my-10 rounded-t-[24px] flex-1 h-[calc(100vh-30px)] pb-8 flex rounded flex-col overflow-hidden bg-[#1d1e24]'>
      <section className='text-white text-xl h-20 font-bold px-8 flex items-center justify-between bg-[#16171b]'>
        <span className='flex justify-start items-center gap-4'>
          <Avatar
            user={session?.toUser || null}
            className='w-12 g-12 rounded-[50%] overflow-hidden inline-block'
          ></Avatar>
          {session?.toUser.name}
        </span>
        <span className=''>
          {/* <IconButton aria-label='delete' color='primary'>
            <MoreHoriz sx={{ color: 'white' }} />
          </IconButton> */}
          <IconButton>
            <MoreHoriz />
          </IconButton>
          <IconButton onClick={() => setMemojiDisplay(!memojiDisplay)}>
            {memojiDisplay ? (
              <img src={emojiIcon} className='w-7' alt=''></img>
            ) : (
              <img src={emojiHiddenIcon} className='w-7' alt=''></img>
              // <SentimentVerySatisfiedSharpIcon fontSize='medium' />
              // <SentimentVeryDissatisfiedSharpIcon fontSize='medium' />
            )}
          </IconButton>
          {/* <InfoOutlinedIcon fontSize='medium' sx={{ ml: 1 }} /> */}

          {/* <Switch /> */}
        </span>
      </section>
      <section className='w-full flex-1 flex justify-between flex-col'>
        <section className='flex-1 relative p-8'>
          <div className='w-full h-full overflow-auto absolute left-0 top-0 flex justify-center items-center mix-blend-screen'>
            <video
              ref={videoRomRef}
              src={MaleVideoSource.video}
              muted={true}
              className={`${memojiDisplay ? 'opacity-100' : 'scale-75 opacity-0'} transition-all`}
            ></video>
            {/* <video ref={videoRomRef} className='' muted={true}></video> */}
          </div>
          <Messages key={session?.id} socketMessage={socketMessageList} onSentimentScoreChange={setSentimentScore} />
        </section>
        {session && <Input onSend={sendMessage} />}
      </section>
    </div>
  );
}

export default memo(Room);
