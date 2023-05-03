interface Session {
  id: number;
  room: Room;
  fromUser: User;
  toUser: User;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  createTime: string;
}
