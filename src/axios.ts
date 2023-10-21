import axios, { AxiosError } from 'axios';
import store from './redux/store';
import { AuthService } from './services/auth.service';
import getAccessToken from './utils/getAccessToken';

const urlsSkipAuth = ['/login', '/logout', '/refresh', '/films/', '/upload'];
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  if (config.url && urlsSkipAuth.some((url) => config.url?.includes(url))) {
    return config;
  }

  const access_token = await getAccessToken();
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const access_token = !!store.getState().user.access_token;

    if (error.response?.status === 401 && error.request.url !== '/logout' && access_token) {
      AuthService.logout();
    }

    throw error;
  },
);

export default instance;
