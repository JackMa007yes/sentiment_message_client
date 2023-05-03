import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import video from '@/assets/video/male.mp4';
import { SentimentController, SentimentScore, SentimentRecord } from '@/utils/video/sentimentController';
import { useQuery } from '@tanstack/react-query';
import { GetRoomMessage, GetUserList } from '@/api';
import Input from './Input';
import { useStore } from '@/store';
import { getToken } from '../../../api/http';
import storage from '@/utils/storage';
import MessagePopup from './MessagePopup';

const SentimentMap: SentimentRecord = {
  [SentimentScore.peaceful]: [1, 7],
  [SentimentScore.positive_5]: [7, 12],
  [SentimentScore.positive_4]: [12, 16],
  [SentimentScore.positive_3]: [16, 20],
  [SentimentScore.positive_2]: [20, 24],
  [SentimentScore.positive_1]: [24, 29],
  [SentimentScore.negative_1]: [30, 34],
  [SentimentScore.negative_2]: [34, 38],
  [SentimentScore.negative_3]: [39, 44],
  [SentimentScore.negative_4]: [44, 50],
  [SentimentScore.negative_5]: [44, 50]
};

type Props = {
  session: Session | null;
  onSend: (message: any) => void;
  // onMessageEvent: (message: any) => void;
  newMessage: any[];
};
export default function Room({ session, onSend, newMessage }: Props) {
  const user = useStore(state => state.user);

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [inEditMessage, setInEditMessage] = useState<string>('');
  const messageRef = useRef<any[]>([]);
  const messageBoxRef = useRef(null);

  const videoController = useRef<SentimentController | null>(null);
  const videoRomRef = useRef<HTMLVideoElement | null>(null);

  useQuery(['GetRoomMessage', limit, page, session?.room.id], () => GetRoomMessage(session!.room.id, { limit, page }), {
    enabled: !!session?.room.id,
    onSuccess: data => {
      const sortedMessageList = data.data.sort((pre, cur) => pre.id - cur.id);
      setMessageHistory(sortedMessageList);
    }
  });

  useEffect(() => {
    setMessageHistory([]);
  }, [session]);

  useEffect(() => {
    console.log(9999);

    const box = messageBoxRef.current as null | HTMLElement;
    if (box) {
      console.log(9999);
      box.scrollTop = box.scrollHeight;
    }
  }, [newMessage, messageHistory]);
  console.log(newMessage.length);

  // const { data: userList } = useQuery(['GetUserList'], () => GetUserList({}), {
  //   initialData: []
  // });

  useEffect(() => {
    videoController.current = new SentimentController(videoRomRef.current!, SentimentMap);
    videoController.current.trigger(SentimentScore.peaceful);
  }, []);

  // const pushMessage = (value: { payload: { userId: number; sentiment_score: any } }) => {
  //   setMessageList(messageRef.current.concat(value.payload));
  //   messageRef.current.push(value.payload);
  //   if (value.payload.userId !== Number(userId)) {
  //     console.log(value.payload.sentiment_score);
  //     videoController.current?.trigger(String(value.payload.sentiment_score) as SentimentScore);
  //   }
  // };

  const sendMessage = (val: string) => {
    if (!val) return;
    onSend({
      type: 'addMessage',
      payload: {
        roomId: session?.room.id,
        userId: session?.fromUser.id,
        message: val
      }
    });
    setInEditMessage('');
  };

  console.log(newMessage, 5555);

  return (
    <div className='flex-1 h-screen flex bg-black rounde rounded-l-[32px] flex-col'>
      <section className='text-white text-2xl h-24 font-bold p-8'>{session?.toUser.name}</section>
      <section className='w-full flex-1 flex justify-between flex-col p-8'>
        <section className='flex-1 bg-black relative'>
          <div className='w-full h-full overflow-auto absolute left-0 top-0 flex justify-center items-center'>
            <video ref={videoRomRef} className='' src={video} muted={true}></video>
          </div>
          <div className='w-full h-full overflow-auto absolute left-0 top-0' ref={messageBoxRef}>
            {[...messageHistory, ...newMessage].map((item: IMessage) => {
              return (
                <MessagePopup
                  data={item}
                  user={item.userId === user?.id ? session?.fromUser : session?.toUser}
                  key={item.id}
                ></MessagePopup>
              );
            })}
          </div>
        </section>
        {session && <Input value={inEditMessage} onChange={setInEditMessage} send={sendMessage} />}
      </section>
    </div>
  );
}
