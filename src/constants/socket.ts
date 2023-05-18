import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const DEV_SOCKET_URL = 'http://localhost:3000';

export const enum ClientToServerEventsEnum {
  MESSAGE = 'message',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom'
}

export const enum ServerToClientEventsEnum {
  MESSAGE = 'message',
  SESSION = 'session'
}

export interface ClientToServerEvents extends DefaultEventsMap {
  [ClientToServerEventsEnum.MESSAGE]: (message: any) => void;
  [ClientToServerEventsEnum.JOIN_ROOM]: (payload: any) => void;
  [ClientToServerEventsEnum.LEAVE_ROOM]: (payload: any) => void;
}

export interface ServerToClientEvents extends DefaultEventsMap {
  [ServerToClientEventsEnum.MESSAGE]: (message: any) => void;
  [ServerToClientEventsEnum.SESSION]: (payload: any) => void;
}
