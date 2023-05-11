import { memo, useEffect, useRef, useState } from 'react';
import { useStore } from '@/store';
import MessagePopup from './MessagePopup';
import { useQuery } from '@tanstack/react-query';
import { GetRoomMessage } from '@/api';
import { SentimentScore } from '@/utils/video/sentimentController';

type Props = {
  socketMessage: IMessage[];
  onSentimentScoreChange: (score: SentimentScore) => void;
};

function Messages({ socketMessage, onSentimentScoreChange }: Props) {
  const { profile, session } = useStore(state => state);
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [historyMessageList, setHistoryMessageList] = useState<IMessage[]>([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [sentimentScore, setSentimentScore] = useState<SentimentScore>(SentimentScore.peaceful);

  const messageBoxRef = useRef<any>(null);

  // if (messageBoxRef.current) {
  //   messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
  // }

  useQuery(['GetRoomMessage', limit, page, session?.room.id], () => GetRoomMessage(session!.room.id, { limit, page }), {
    enabled: !!session?.room.id,
    onSuccess: data => {
      const sortedMessageList = data.data.sort((pre, cur) => pre.id - cur.id);
      const combinedList = [...sortedMessageList, ...historyMessageList];
      setHistoryMessageList(combinedList);
    }
  });

  const scrollTop = () => {
    const box = messageBoxRef.current as null | HTMLElement;
    if (box) {
      box.scrollTop = box.scrollHeight;
    } else {
      // Noop
    }
  };

  const getSentimentScore = () => {
    const lastReceiveMessage = messageList.reverse().find(message => {
      return message.userId !== profile?.id;
    });

    return lastReceiveMessage
      ? (String(lastReceiveMessage.sentiment_score) as SentimentScore)
      : SentimentScore.peaceful;
  };

  useEffect(() => {
    setMessageList([...historyMessageList, ...socketMessage]);
  }, [historyMessageList, socketMessage]);

  useEffect(() => {
    // scrollTop();
    setSentimentScore(getSentimentScore());
  }, [messageList]);

  useEffect(() => onSentimentScoreChange(sentimentScore), [sentimentScore]);

  useEffect(() => {
    const scrollTopEvent = () => {
      console.log(messageBoxRef.current.scrollBottom);
      if (!messageBoxRef.current.scrollTop) {
        setPage(page + 1);
      } else {
        //
      }
    };
    messageBoxRef.current?.addEventListener('scroll', scrollTopEvent);
    return () => {
      messageBoxRef.current?.removeEventListener('scroll', scrollTopEvent);
    };
  }, [messageList, limit, page]);

  return (
    <div className='w-full h-full overflow-auto absolute left-0 top-0 px-10 p-4' ref={messageBoxRef}>
      {messageList.map(item => {
        return (
          <MessagePopup
            data={item}
            user={item.userId === profile?.id ? session?.fromUser : session?.toUser}
            key={item.id}
          ></MessagePopup>
        );
      })}
    </div>
  );
}

export default memo(Messages);
