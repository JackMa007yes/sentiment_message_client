import { create } from 'zustand';
import storage from '@/utils/storage';

type State = {
  hasLogin: boolean;
  profile: Profile | null;
  session: Session | null;
  sessionList: Session[];
};

type Action = {
  setLogin: (firstName: State['hasLogin']) => void;
  setProfile: (lastName: State['profile']) => void;
  setSession: (session: Session) => void;
  setSessionList: (sessionList: Session[]) => void;
  restore: () => void;
};

export const useStore = create<State & Action>(set => ({
  hasLogin: !!storage.getToken()?.token,
  profile: null,
  session: null,
  sessionList: [],

  setLogin: hasLogin => set(() => ({ hasLogin })),
  setProfile: profile => set(() => ({ profile })),
  setSession: session => set(() => ({ session })),
  setSessionList: sessionList => set(() => ({ sessionList })),
  restore: () => set(() => ({ hasLogin: false, profile: null, session: null, sessionList: [] }))
}));
