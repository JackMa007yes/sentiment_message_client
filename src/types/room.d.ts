import { RoomType } from '@/constants';

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
}
