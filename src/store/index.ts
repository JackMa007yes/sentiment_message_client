import { create } from 'zustand';
import storage from '@/utils/storage';

type State = {
  hasLogin: boolean;
  user: any;
};

type Action = {
  setLogin: (firstName: State['hasLogin']) => void;
  setUser: (lastName: State['user']) => void;
};

export const useStore = create<State & Action>(set => ({
  hasLogin: !!storage.getToken()?.token,
  user: null,
  setLogin: hasLogin => set(() => ({ hasLogin: hasLogin })),
  setUser: user => set(() => ({ user: user }))
}));
