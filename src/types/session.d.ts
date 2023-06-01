interface SessionBase {
  id: number;
  unreadCount: number;
  lastMessage: IMessage | null;
  lastMessageTime: string;
  createTime: string;
}

interface Session extends SessionBase {
  room: Room;
  fromUser: User;
  toUser: User;
}
