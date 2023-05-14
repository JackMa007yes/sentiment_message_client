import { memo, useState } from 'react';
import { SentimentScore } from '@/utils/video/sentimentController';
import { useStore } from '@/store';
import TopBar from './TopBar';
import Messages from './Messages';
import Input from './Input';
import Memoji from './Memoji';

type Props = {
  onSend: (message: any) => void;
  socketMessageList: IMessage[];
};
function Room({ onSend, socketMessageList }: Props) {
  const { session } = useStore(state => state);
  const [memojiDisplay, setMemojiDisplay] = useState(false);
  const [sentimentScore, setSentimentScore] = useState<SentimentScore>(SentimentScore.peaceful);

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

  return (
    <div className='mr-8 my-10 rounded-t-[24px] flex-1 h-[calc(100vh-30px)] pb-8 flex rounded flex-col overflow-hidden bg-[#1d1e24]'>
      <TopBar
        memoji={{
          open: memojiDisplay,
          onToggle: setMemojiDisplay
        }}
        moreClick={console.log}
      />
      <section className='flex-1 relative p-8'>
        <Memoji open={memojiDisplay} score={sentimentScore} />
        <Messages key={session?.id} socketMessage={socketMessageList} onSentimentScoreChange={setSentimentScore} />
      </section>
      {session && <Input onSend={sendMessage} />}
    </div>
  );
}

export default memo(Room);
