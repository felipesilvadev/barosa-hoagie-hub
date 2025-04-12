import { api } from '../network/api';

export type AuthenticateData = {
  email: string;
  password: string;
};

type AuthenticateResponse = {
  access_token: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const authApi = {
  authenticate: ({ email, password }: AuthenticateData) =>
    api.post<AuthenticateResponse>('/sessions', { email, password }),
  register: ({ name, email, password }: RegisterData) =>
    api.post('/accounts', { name, email, password }),
};
