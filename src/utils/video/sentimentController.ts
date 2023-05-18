import { VideoController } from './videoController';

export enum SentimentScore {
  positive_5 = '5',
  positive_4 = '4',
  positive_3 = '3',
  positive_2 = '2',
  positive_1 = '1',
  peaceful = '0',
  negative_1 = '-1',
  negative_2 = '-2',
  negative_3 = '-3',
  negative_4 = '-4',
  negative_5 = '-5'
}

export type SentimentRecord = Record<SentimentScore, [number, number]>;

export class SentimentController extends VideoController {
  private fragmentMap: SentimentRecord;

  constructor(node: HTMLVideoElement, fragmentMap: SentimentRecord) {
    super(node);
    this.fragmentMap = fragmentMap;
  }

  trigger(score: SentimentScore) {
    if (!Number.isNaN(Number(score))) {
      this.loop(this.fragmentMap[score]);
    }
  }
}
