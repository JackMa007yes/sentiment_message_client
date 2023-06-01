import { SentimentScore, SentimentRecord } from '@/utils/video/sentimentController';
import video from '@/assets/video/female.mp4';

const SentimentClipMap: SentimentRecord = {
  [SentimentScore.peaceful]: [0.3, 2.2],
  [SentimentScore.positive_5]: [2, 4],
  [SentimentScore.positive_4]: [5, 7],
  [SentimentScore.positive_3]: [7, 10],
  [SentimentScore.positive_2]: [10, 12],
  [SentimentScore.positive_1]: [12, 14],
  [SentimentScore.negative_1]: [18, 20],
  [SentimentScore.negative_2]: [20, 24],
  [SentimentScore.negative_3]: [26, 29],
  [SentimentScore.negative_4]: [30, 33],
  [SentimentScore.negative_5]: [30, 33]
};

export const Female1VideoSource = {
  src: video,
  SentimentClipMap
};
