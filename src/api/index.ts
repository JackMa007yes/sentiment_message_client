import http from './http';

// Auth
export const Login = (params: LoginParams): Promise<LoginData> => {
  return http.post(`/auth/login`, params);
};

// User
export const Register = (data: RegisterData): Promise<RegisterData> => {
  return http.post('/api/user', data);
};

export const GetProfile = (): Promise<Profile> => {
  return http.get(`/user/my`);
};

export const GetUserList = (params: Pagination): Promise<PaginationWrapper<User>> => {
  return http.get(`/user`, { params });
};

export const UploadAvatar = (form: FormData): Promise<any> => {
  return http.post(`/user/avatar`, form);
};

// Session
export const GetSessionList = (): Promise<Session[]> => {
  return http.get(`/session`);
};

// Room
export const CreateRoom = (data: CreateRoomParams) => {
  return http.post('/room', data);
};
