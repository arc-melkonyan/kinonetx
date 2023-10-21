import axios from '@/axios';
import { permanentRedirect } from 'next/navigation';

export const AuthService = {
  async login({ email, password }: { email: string; password: string }) {
    const res = await axios.post('/auth/login', {
      email,
      password,
    });

    return res;
  },

  async register({
    email,
    password,
    name,
    image,
  }: {
    email: string;
    password: string;
    name: string;
    image: string;
  }) {
    const res = await axios.post('/auth/register', {
      email,
      name,
      image,
      password,
    });

    return res;
  },

  async refreshToken() {
    const res = await axios.get('/refresh');
    return res;
  },

  async logout() {
    const data = await axios.get(`/auth/logout`);
    console.log(data);
  },

  async getProfile() {
    const res = await axios.get('/profile');
    return res;
  },
};
