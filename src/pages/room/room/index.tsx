import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { io } from 'socket.io-client';
import { Button } from '@mui/material';
import video from '@/assets/video/male.mp4';
import { SentimentController, SentimentScore, SentimentRecord } from '@/utils/video/sentimentController';
import { useQuery } from '@tanstack/react-query';
import { GetUserList } from '@/api';
import Input from './Input';
import { useStore } from '@/store';

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
  user: UserListItem | null;
};
export default function Room({ user }: Props) {
  const userId = useStore(state => state.user?.id);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState<number>(0);
  // const [userId, setUserId] = useState<number>(0);
  const [client, setClient] = useState<any>(null);
  const [messageList, setMessageList] = useState<any>([]);
  const [inEditMessage, setInEditMessage] = useState<string>('');
  const messageRef = useRef<any[]>([]);
  const videoController = useRef<SentimentController | null>(null);
  const videoRomRef = useRef<HTMLVideoElement | null>(null);

  const { data: userList } = useQuery(['GetUserList'], () => GetUserList({}), {
    initialData: []
  });

  useEffect(() => {
    videoController.current = new SentimentController(videoRomRef.current!, SentimentMap);
    videoController.current.trigger(SentimentScore.peaceful);
  }, []);

  const pushMessage = value => {
    setMessageList(messageRef.current.concat(value.payload));
    messageRef.current.push(value.payload);
    if (value.payload.userId !== Number(userId)) {
      console.log(value.payload.sentiment_score);
      videoController.current?.trigger(String(value.payload.sentiment_score) as SentimentScore);
    }
  };

  useEffect(() => {
    if (!user) return;
    connect();
  }, [user]);

  const connect = () => {
    console.log(99999);
    if (client?.connected) return;
    const socket = io('http://localhost:3000');
    socket.connect();

    function onConnect() {
      console.log('onConnect');
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('onDisconnect');
      setIsConnected(false);
    }

    socket.on(`room_${roomId}`, pushMessage);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    setClient(socket);
  };
  console.log(`room_${roomId}`, messageList);
  const disconnect = () => {
    client.close();
  };

  const sendMessage = (val: string) => {
    if (!val) return;
    client.emit(`message`, {
      type: 'addMessage',
      payload: {
        roomId,
        userId,
        message: val
      }
    });
    setInEditMessage('');
  };

  return (
    <div className='flex-1 h-screen flex bg-black rounde rounded-l-[40px] flex-col'>
      <section className='text-white text-2xl h-24 font-bold p-8'>{user?.name || ''}</section>
      {/* <section className='w-44'>
        {userList.map(item => {
          return <section key={item.id}>{item.name}</section>;
        })}
      </section> */}
      {/* <section className='border flex-1'>
        <TextField
          fullWidth
          label='r'
          id='fullWidth'
          onChange={e => {
            console.log(e.target.value);
            setRoomId(Number(e.target.value as any));
          }}
        />
        <TextField
          fullWidth
          label='u'
          id='fullWidth'
          onChange={e => {
            setUserId(Number(e.target?.value as any));
          }}
        />
        <Button onClick={() => connect()}>C</Button>
        <Button onClick={() => disconnect()}>D</Button>
        <Button onClick={() => videoController.current?.play()}>play</Button>
        <Button onClick={() => videoController.current?.pause()}>pause</Button>
        <Button onClick={() => videoController.current?.jump(10)}>jump</Button>
        <Button onClick={() => videoController.current?.playClip([3, 5])}>playClip</Button>
        <Button onClick={() => videoController.current?.loop([10, 13])}>loop</Button>
      </section> */}
      <section className='w-full flex-1 flex justify-between flex-col p-8'>
        <section className='flex-1 bg-black relative'>
          <div className='w-full h-full overflow-auto absolute left-0 top-0 flex justify-center items-center'>
            <video ref={videoRomRef} className='' src={video} muted={true}></video>
          </div>
          <div className='w-full h-full overflow-auto absolute left-0 top-0'>
            {messageList.map(item => {
              return (
                <section
                  key={item.id}
                  className={`rounded-lg p-2 px-4 m-2 bg-white w-4/5 ${
                    item.userId !== userId ? 'float-left bg-green-700' : 'float-right'
                  } `}
                  style={{
                    // background: 'rgba( 255, 255, 255, 0.35 )',
                    // boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                    // backdropFilter: 'blur( 11.5px )',
                    // '-webkitBackdropFilter': 'blur( 11.5px )',
                    borderRadius: '22px',
                    backgroundColor: 'rgba(0,0,0,0)',

                    border: '1px solid rgba( 255, 255, 255, 1 )',
                    color: 'white'
                  }}
                >
                  {item.message}
                </section>
              );
            })}
          </div>
        </section>
        <Input value={inEditMessage} onChange={setInEditMessage} send={sendMessage} />
      </section>
    </div>
  );
}
