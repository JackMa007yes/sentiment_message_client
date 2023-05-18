import { MessageType } from './../constants/common';
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
    type: MessageType;
    userId: number;
    message: string;
    imageUrl: string;
    roomId: number;
    sentimentScore: number;
    createdAt: string;
  }
}
