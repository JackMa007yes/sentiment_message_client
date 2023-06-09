import { memo, useState } from 'react';
import { SentimentScore } from '@/utils/video/sentimentController';
import { useStore } from '@/store';
import TopBar from './TopBar';
import Messages from './Messages';
import Input from './Input';
import Memoji from './Memoji';
import { MessageType } from '@/constants';
import { useIsPC } from '@/hooks/useIsPC';

const WrapperClassMap = {
  PC: 'mr-8 my-10 rounded-t-[24px] flex-1 h-[calc(100vh-30px)] pb-8 flex rounded flex-col overflow-hidden bg-[#1d1e24]',
  mobile: 'h-full w-full flex flex-col'
};

function Room() {
  const { session, socketMessageList, client } = useStore(state => state);
  const [memojiDisplay, setMemojiDisplay] = useState(true);
  const [sentimentScore, setSentimentScore] = useState<SentimentScore>(SentimentScore.peaceful);
  const isPC = useIsPC();

  const sendMessage = (message: { type: MessageType; val: string }) => {
    client?.emit('message', {
      type: 'addMessage',
      payload: Object.assign(
        { roomId: session?.room.id, userId: session?.fromUser.id, type: message.type },
        message.type === MessageType.TEXT
          ? {
              message: message.val
            }
          : {
              imageUrl: message.val
            }
      )
    });
  };

  return (
    <div className={isPC ? WrapperClassMap.PC : WrapperClassMap.mobile}>
      <TopBar
        memoji={{
          open: memojiDisplay,
          onToggle: setMemojiDisplay
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        moreClick={() => {}}
      />
      <section className='flex-1 relative w-full'>
        <Memoji user={session?.toUser} open={memojiDisplay} score={sentimentScore} />
        <Messages key={session?.id} socketMessage={socketMessageList} onSentimentScoreChange={setSentimentScore} />
      </section>
      {session && <Input onSend={sendMessage} />}
    </div>
  );
}

export default memo(Room);
