import { GenderEnum } from '@/constants/common';
import { SentimentRecord } from '@/utils/video/sentimentController';
import { Male1VideoSource, Male2VideoSource, Female1VideoSource, PigVideoSource } from '@/constants/video';
import female1 from '@/assets/img/female_1.png';
import male1 from '@/assets/img/male_1.png';
import male2 from '@/assets/img/male_2.png';
import male3 from '@/assets/img/male_3.png';
import male4 from '@/assets/img/male_4.png';
import male5 from '@/assets/img/male_5.png';
import shit from '@/assets/img/shit.png';
import bear from '@/assets/img/bear.png';
import pig from '@/assets/img/pig.png';

export enum MemojiValue {
  NO_SET,
  MALE1,
  FEMALE1,
  MALE2,
  MALE3,
  MALE4,
  MALE5,
  PIG,
  SHIT,
  BEAR
}

export interface MemojiOption {
  img: any;
  video: {
    src: string;
    SentimentClipMap: SentimentRecord;
  } | null;
  value: number;
  lock: boolean;
}

export const MemojiList: MemojiOption[] = [
  {
    img: female1,
    video: Female1VideoSource,
    value: MemojiValue.FEMALE1,
    lock: false
  },
  {
    img: male1,
    video: Male1VideoSource,
    value: MemojiValue.MALE1,
    lock: false
  },
  {
    img: male2,
    video: Male2VideoSource,
    value: MemojiValue.MALE2,
    lock: false
  },
  {
    img: pig,
    video: PigVideoSource,
    value: MemojiValue.PIG,
    lock: false
  },
  {
    img: male3,
    video: null,
    value: MemojiValue.MALE3,
    lock: true
  },
  {
    img: male4,
    video: null,
    value: MemojiValue.MALE4,
    lock: true
  },
  {
    img: male5,
    video: null,
    value: MemojiValue.MALE5,
    lock: true
  },
  {
    img: shit,
    video: null,
    value: MemojiValue.SHIT,
    lock: true
  },
  {
    img: bear,
    video: null,
    value: MemojiValue.BEAR,
    lock: true
  }
];

export const getMemojiOptionByUser = (user: Profile): MemojiOption => {
  if (user.memoji) {
    return MemojiList.find(item => item.value === user.memoji)!;
  } else {
    const memojiVal = user.gender === GenderEnum.FEMALE ? MemojiValue.FEMALE1 : MemojiValue.MALE1;
    return MemojiList.find(item => item.value === memojiVal)!;
  }
};
