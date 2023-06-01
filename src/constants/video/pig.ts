import { SentimentScore, SentimentRecord } from '@/utils/video/sentimentController';
import video from '@/assets/video/pig.mp4';

const SentimentClipMap: SentimentRecord = {
  [SentimentScore.peaceful]: [0.4, 2],
  [SentimentScore.positive_5]: [2, 5],
  [SentimentScore.positive_4]: [5, 8],
  [SentimentScore.positive_3]: [8, 10],
  [SentimentScore.positive_2]: [10, 12],
  [SentimentScore.positive_1]: [12, 16],
  [SentimentScore.negative_1]: [17, 19],
  [SentimentScore.negative_2]: [20, 22],
  [SentimentScore.negative_3]: [22, 25.5],
  [SentimentScore.negative_4]: [25.5, 28],
  [SentimentScore.negative_5]: [25.5, 28]
};

export const PigVideoSource = {
  src: video,
  SentimentClipMap
};
