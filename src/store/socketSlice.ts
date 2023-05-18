import { Socket } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '@/constants/socket';

type State = {
  client: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  socketMessageList: IMessage[];
  updatedSessionMap: Record<string, SessionBase>;
};

type Action = {
  setClient: (cleint: Socket<ServerToClientEvents, ClientToServerEvents>) => void;
  setSocketMessageList: (list: IMessage[]) => void;
  updateSocketMessageList: (list: IMessage[]) => void;
  setUpdatedSessionMap: (updatedSession: Record<string, SessionBase>) => void;
  reset: () => void;
};

export type SocketSliceType = State & Action;

export const createSocketSlice = (set: any): SocketSliceType => ({
  client: null,
  socketMessageList: [],
  updatedSessionMap: {},

  setClient: client => set(() => ({ client })),
  setSocketMessageList: socketMessageList => set(() => ({ socketMessageList })),
  updateSocketMessageList: socketMessageList =>
    set((state: any) => ({ socketMessageList: [...state.socketMessageList, ...socketMessageList] })),
  setUpdatedSessionMap: updatedSessionMap => set(() => ({ updatedSessionMap })),
  reset: () => set(() => ({ client: null, socketMessageList: [], updatedSessionMap: {} }))
});
