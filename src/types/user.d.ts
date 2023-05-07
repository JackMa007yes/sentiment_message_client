interface RegisterData {
  name: string;
  password: string;
}

interface UpdateProfileData {
  name: string;
  desc: string;
  gender: number;
}

interface User {
  id: number;
  name: string;
  desc: string;
  gender: 0 | 1;
  avatar?: {
    type: string;
    data: number[];
  };
}

type Profile = User;
