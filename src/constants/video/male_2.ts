import { SentimentScore, SentimentRecord } from '@/utils/video/sentimentController';
import video from '@/assets/video/male2.mp4';

const SentimentClipMap: SentimentRecord = {
  [SentimentScore.peaceful]: [19, 21],
  [SentimentScore.positive_5]: [2, 4],
  [SentimentScore.positive_4]: [5, 8],
  [SentimentScore.positive_3]: [9, 11.5],
  [SentimentScore.positive_2]: [12, 14],
  [SentimentScore.positive_1]: [15, 17],
  [SentimentScore.negative_1]: [20, 24],
  [SentimentScore.negative_2]: [24, 28],
  [SentimentScore.negative_3]: [28, 31],
  [SentimentScore.negative_4]: [31, 34],
  [SentimentScore.negative_5]: [31, 34]
};

export const Male2VideoSource = {
  src: video,
  SentimentClipMap
};
