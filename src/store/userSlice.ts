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
  setSession: (session: Session | null) => void;
  setSessionList: (sessionList: Session[]) => void;
  reset: () => void;
};

export type UserSliceType = State & Action;

export const createUserSlice = (set: any): UserSliceType => ({
  hasLogin: !!storage.getToken()?.token,
  profile: null,
  session: null,
  sessionList: [],

  setLogin: hasLogin => set(() => ({ hasLogin })),
  setProfile: profile => set(() => ({ profile })),
  setSession: session => set(() => ({ session })),
  setSessionList: sessionList => set(() => ({ sessionList })),
  reset: () => set(() => ({ hasLogin: false, profile: null, session: null, sessionList: [] }))
});
