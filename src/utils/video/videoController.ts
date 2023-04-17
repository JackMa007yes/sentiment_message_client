export class VideoController {
  private video;
  private start: number;
  private end: number;
  private isOpenLoop: boolean;

  constructor(node: HTMLVideoElement) {
    this.video = node;
    this.start = 0;
    this.end = node.duration;
    this.isOpenLoop = false;
  }

  play() {
    return this.video.play();
  }

  pause() {
    return this.video.pause();
  }

  /**
   * @param time 快进到目标时间点
   */
  jump(time: number) {
    this.video.currentTime = time;
  }

  /**
   * @param param 开始结束时间数组
   */
  playClip([start, end]: number[]) {
    // debugger;
    this._playClip([start, end], false);
  }

  /**
   * @param param 开始结束时间数组
   */
  loop([start, end]: number[]) {
    this._playClip([start, end], true);
  }

  /**
   * @param param 开始结束时间数组
   * @param loop 是否循环
   */
  private async _playClip([start, end]: number[], loop: boolean) {
    this.start = start;
    this.end = end;
    this.isOpenLoop = loop;

    this.video.removeEventListener('timeupdate', this.checkArrivalEndTime);
    this.video.addEventListener('timeupdate', this.checkArrivalEndTime);

    this.jump(this.start);
    await this.play();
  }

  private async _checkArrivalEndTime() {
    if (this.video.currentTime >= this.end) {
      await this.pause();
      this.video.removeEventListener('timeupdate', this.checkArrivalEndTime);
      this.isOpenLoop && (await this._playClip([this.start, this.end], this.isOpenLoop));
    }
  }
  private checkArrivalEndTime = this._checkArrivalEndTime.bind(this);
}
