import { useStore } from '@/store';
import { useState, useEffect } from 'react';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client';
import storage from '@/utils/storage';
import { ServerToClientEvents, ClientToServerEvents, DEV_SOCKET_URL } from '@/constants/socket';

export const useSocket = () => {
  const {
    session,
    client,
    setClient,
    sessionList,
    setSessionList,
    socketMessageList,
    setSocketMessageList,
    updateSocketMessageList,
    updatedSessionMap,
    setUpdatedSessionMap
  } = useStore(state => state);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(import.meta.env.MODE === 'development' ? DEV_SOCKET_URL : '/', {
      query: {
        token: storage.getToken()?.token
      }
    }) as unknown as Socket<ServerToClientEvents, ClientToServerEvents>;

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(value: any) {
      updateSocketMessageList([value.payload]);
    }

    function onSessionEvent(value: any) {
      setUpdatedSessionMap(Object.assign({}, { ...updatedSessionMap, [value.payload.id]: value.payload }));
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

  const mergeSessionList = (updatedSession: Record<string, SessionBase>) => {
    const newSessionList = sessionList.map(session => {
      const newSession = updatedSession[session.id];
      if (newSession) {
        return {
          ...session,
          ...newSession
        };
      } else {
        return session;
      }
    });
    return newSessionList;
  };

  useEffect(() => {
    setSessionList(mergeSessionList(updatedSessionMap));
  }, [updatedSessionMap]);

  return { client, isConnected, socketMessageList, updatedSessionMap };
};
