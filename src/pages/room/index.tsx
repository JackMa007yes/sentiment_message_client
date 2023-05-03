import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { useStore } from '@/store';
import Layout from './Layout';
import SessionBar from './sessionBar';
import Room from './room';

import { getToken } from '@/api/http';
import storage from '@/utils/storage';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { GetProfile } from '@/api';

interface ServerToClientEvents extends DefaultEventsMap {
  message: (message: any) => void;
  joinRoom: (payload: any) => void;
  leaveRoom: (payload: any) => void;
}

interface ServerToClientEvents extends DefaultEventsMap {
  message: (message: any) => void;
  session: (payload: any) => void;
}

export default function index() {
  const setUser = useStore(state => state.setUser);
  const [currentSession, setCurrentSession] = useState<null | Session>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState<Socket<ServerToClientEvents, ServerToClientEvents> | null>(null);
  const [newMessage, setNewMessage] = useState<any[]>([]);

  // const connect = () => {
  //   if (client?.connected) return;
  //   const socket = io('http://localhost:3000', {
  //     query: {
  //       token: storage.getToken()?.token
  //     }
  //   }) as unknown as Socket<ServerToClientEvents, ServerToClientEvents>;
  //   // socket.connect();

  //   function onConnect() {
  //     console.log('onConnect');
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     console.log('onDisconnect');
  //     setIsConnected(false);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('message', value => {
  //     console.log(value, 66666);
  //     // newMessageStorage.current = [...newMessageStorage.current, value.payload];
  //     setNewMessage(previous => [...previous, value.payload]);
  //   });
  //   socket.on('session', console.log);

  //   setClient(socket);
  // };
  // const disconnect = () => {
  //   client?.disconnect();
  // };

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      query: {
        token: storage.getToken()?.token
      }
    }) as unknown as Socket<ServerToClientEvents, ServerToClientEvents>;

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(value: any) {
      console.log('in function');
      setNewMessage(previous => [...previous, value.payload]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    setClient(socket);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, []);

  // useEffect(() => {
  //   connect();
  //   return disconnect;
  // }, []);

  useEffect(() => {
    currentSession && client?.emit('joinRoom', { userId: currentSession.fromUser.id, roomId: currentSession.room.id });
    setNewMessage([]);
  }, [currentSession]);

  const seedMessage = (message: any) => {
    client?.emit('message', message);
  };

  console.log(777, newMessage.length);

  return (
    <Layout>
      <section className='flex justify-between'>
        <SessionBar current={currentSession} onSelect={setCurrentSession} />
        <Room session={currentSession} onSend={seedMessage} newMessage={newMessage} />
      </section>
    </Layout>
  );
}
