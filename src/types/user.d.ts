interface UserListItem {
  id: number;
  name: string;
  desc: string;
  gender: 0 | 1;
  avatar?: {
    type: string;
    data: number[];
  };
}

type Profile = UserListItem;
