import { create } from 'zustand';
import { createUserSlice, UserSliceType } from './userSlice';
import { createSocketSlice, SocketSliceType } from './socketSlice';

type Action = {
  restore: () => void;
};

export const useStore = create<SocketSliceType & UserSliceType & Action>(set => ({
  ...createUserSlice(set),
  ...createSocketSlice(set),
  restore: () => {
    createUserSlice(set).reset();
    createSocketSlice(set).reset();
  }
}));
