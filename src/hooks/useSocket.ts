import { useState, useEffect } from 'react';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client';
import storage from '@/utils/storage';
import { ServerToClientEvents, ClientToServerEvents, SOCKET_URL } from '@/constants/socket';

export const useSocket = (session: Session | null) => {
  const [client, setClient] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socketMessageList, setSocketMessageList] = useState<IMessage[]>([]);
  const [updatedSessionMap, setUpdatedSessionMap] = useState<Record<string, SessionBase>>({});

  useEffect(() => {
    const socket = io(SOCKET_URL, {
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
      setSocketMessageList(previous => [...previous, value.payload]);
    }

    function onSessionEvent(value: any) {
      console.log(9999);
      setUpdatedSessionMap(previous => ({ ...previous, [value.payload.id]: value.payload }));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);
    socket.on('session', onSessionEvent);

    setClient(socket);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
      socket.off('session', onSessionEvent);
    };
  }, []);

  useEffect(() => {
    setSocketMessageList([]);
  }, [session]);

  return { client, isConnected, socketMessageList, updatedSessionMap };
};
