import { RoomType } from '@/constants/common';

declare global {
  interface Room {
    id: number;
    uuid: string;
    type: RoomType;
    createdAt: string;
  }

  interface CreateRoomParams {
    type: RoomType;
    users: number[];
  }

  interface IMessage {
    id: number;
    userId: number;
    message: string;
    roomId: number;
    sentiment_score: number;
    createdAt: string;
  }
}
