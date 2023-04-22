import http from './http';

export const Login = (params: LoginParams): Promise<LoginData> => {
  return http.post(`/auth/login`, params);
};

export const GetProfile = (): Promise<Profile> => {
  return http.get(`/user/my`);
};

export const GetUserList = (params: Pagination): Promise<PaginationWrapper<UserListItem>> => {
  return http.get(`/user`, { params });
};

export const UploadAvatar = (form: FormData): Promise<any> => {
  return http.post(`/user/avatar`, form);
};
