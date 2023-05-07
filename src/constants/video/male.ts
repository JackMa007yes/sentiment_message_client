import { SentimentScore, SentimentRecord } from '@/utils/video/sentimentController';
import video from '@/assets/video/male.mp4';

const SentimentMap: SentimentRecord = {
  [SentimentScore.peaceful]: [1, 7],
  [SentimentScore.positive_5]: [7, 12],
  [SentimentScore.positive_4]: [12, 16],
  [SentimentScore.positive_3]: [16, 20],
  [SentimentScore.positive_2]: [20, 24],
  [SentimentScore.positive_1]: [24, 29],
  [SentimentScore.negative_1]: [30, 34],
  [SentimentScore.negative_2]: [34, 38],
  [SentimentScore.negative_3]: [39, 44],
  [SentimentScore.negative_4]: [44, 50],
  [SentimentScore.negative_5]: [44, 50]
};

export const MaleVideoSource = {
  video,
  SentimentMap
};
