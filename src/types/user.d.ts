import { GenderEnum } from '@/constants/common';
import { MemojiValue } from '@/constants/memoji';
declare global {
  interface RegisterData {
    name: string;
    password: string;
    gender: GenderEnum;
  }

  interface UpdateProfileData {
    name?: string;
    desc?: string;
    gender?: number;
    memoji?: MemojiValue;
  }

  interface User {
    id: number;
    name: string;
    desc: string;
    gender: 0 | 1;
    avatar?: string;
    memoji: MemojiValue;
  }

  type Profile = User;
}
