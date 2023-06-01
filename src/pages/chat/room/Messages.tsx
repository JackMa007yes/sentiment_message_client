import { memo, useEffect, useRef, useState } from 'react';
import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { unionBy } from 'lodash-es';
import { useRaf, useUpdateEffect } from 'react-use';
import { GetRoomMessage } from '@/api';
import { SentimentScore } from '@/utils/video/sentimentController';
import MessagePopup from './MessagePopup';
import { useIsPC } from '@/hooks/useIsPC';

const LIMIT_NUMBER = 8;
const isInt = (number: number) => Math.floor(number) === number;

type Props = {
  socketMessage: IMessage[];
  onSentimentScoreChange: (score: SentimentScore) => void;
};
function Messages({ socketMessage, onSentimentScoreChange }: Props) {
  const { profile, session } = useStore(state => state);
  const messageBoxRef = useRef<any>(null);
  const [historyMessageList, setHistoryMessageList] = useState<IMessage[]>([]);
  const [page, setPage] = useState(1);
  const [sentimentScore, setSentimentScore] = useState<SentimentScore>(SentimentScore.peaceful);
  const [historyMessageInquired, setHistoryMessageInquired] = useState(false);
  const [lastQueryHistoryMessageLength, setLastQueryHistoryMessageLength] = useState(0);
  const isPC = useIsPC();

  const { isLoading } = useQuery(
    ['GetRoomMessage', page, session?.room.id],
    () => GetRoomMessage(session!.room.id, { limit: LIMIT_NUMBER, page }),
    {
      enabled: !!session?.room.id,
      onSuccess: data => {
        const sortedMessageList = data.data.sort((pre, cur) => pre.id - cur.id);
        const combinedList = unionBy([...sortedMessageList, ...historyMessageList], (message: IMessage) => message.id);
        setLastQueryHistoryMessageLength(combinedList.length - historyMessageList.length);
        setHistoryMessageList(combinedList);
      }
    }
  );

  const scrollTop = (quick = false) => {
    const box = messageBoxRef.current as null | HTMLElement;
    if (box) {
      if (quick) {
        box.scrollTop = box.scrollHeight;
      } else {
        const moveFn = () => {
          if (box.scrollTop < box.scrollHeight - box.clientHeight - 20) {
            box.scrollTop = box.scrollTop + (isPC ? 20 : 5);
            requestAnimationFrame(moveFn);
          }
        };
        requestAnimationFrame(moveFn);
      }
    } else {
      // Noop
    }
  };

  const keepPosition = () => {
    if (lastQueryHistoryMessageLength && messageBoxRef.current) {
      const el = messageBoxRef.current.children[lastQueryHistoryMessageLength];
      if (el) {
        messageBoxRef.current.scrollTop = el.offsetTop;
      } else {
        // Noop
      }
    }
  };

  const getSentimentScore = () => {
    const lastReceiveMessage = [...historyMessageList, ...socketMessage].reverse().find(message => {
      return message.userId !== profile?.id;
    });

    return lastReceiveMessage ? (String(lastReceiveMessage.sentimentScore) as SentimentScore) : SentimentScore.peaceful;
  };

  const reachTopEvent = () => {
    if (!messageBoxRef.current.scrollTop && !isLoading) {
      const messageCount = historyMessageList.length + socketMessage.length;
      const newPageNumber = isInt(messageCount / LIMIT_NUMBER)
        ? Math.ceil(messageCount / LIMIT_NUMBER) + 1
        : Math.ceil(messageCount / LIMIT_NUMBER);
      if (newPageNumber !== page) setPage(newPageNumber);
    } else {
      //
    }
  };

  useEffect(() => {
    scrollTop();
  }, [socketMessage]);

  useUpdateEffect(() => {
    !historyMessageInquired && setHistoryMessageInquired(true);
    historyMessageInquired ? keepPosition() : scrollTop(true);
  }, [historyMessageList]);

  useEffect(() => {
    setSentimentScore(getSentimentScore());
  }, [socketMessage, historyMessageList]);

  useEffect(() => onSentimentScoreChange(sentimentScore), [sentimentScore]);

  useEffect(() => {
    messageBoxRef.current?.addEventListener('scroll', reachTopEvent);
    return () => {
      messageBoxRef.current?.removeEventListener('scroll', reachTopEvent);
    };
  }, [historyMessageList, socketMessage, page, isLoading]);

  return (
    <div
      className={`w-screen h-full overflow-auto absolute right-0 top-0 p-4  ${isPC ? 'px-10' : ''}`}
      ref={messageBoxRef}
    >
      {[...historyMessageList, ...socketMessage].map(item => {
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
