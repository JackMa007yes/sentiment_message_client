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

export const GetUserList = (params: Pagination & { keywords?: string }): Promise<PaginationWrapper<User>> => {
  return http.get(`/user`, { params });
};

export const UploadAvatar = (form: FormData): Promise<any> => {
  return http.post(`/user/avatar`, form);
};

export const UpdateProfile = (data: UpdateProfileData): Promise<any> => {
  return http.patch(`/user`, data);
};

// Session
export const GetSessionList = (): Promise<Session[]> => {
  return http.get(`/session`);
};

export const checkSessionMessage = (id: number) => {
  return http.post(`/session/check/${id}`);
};

// Room
export const CreateRoom = (data: CreateRoomParams) => {
  return http.post('/room', data);
};

export const GetRoomMessage = (id: number, params: Pagination): Promise<PaginationWrapper<IMessage>> => {
  return http.get(`/room/message/${id}`, { params });
};
