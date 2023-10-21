import { IFilm } from '@/types/film.interface';
import axios from '@/axios';

export const FilmService = {
  async getAll({ page, search }: { page: number; search: string }) {
    const filters = {
      search: search,
      page: String(page),
      limit: String(12),
    };

    const queryString = new URLSearchParams(filters).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films?${queryString}`);
    const data = await res.json();

    return data;
  },

  async getBySlug(slug: string, refreshToken: string | undefined) {
    let headers;

    if (refreshToken) {
      headers = { Cookie: `refreshToken=${refreshToken}` };
    }

    const { data } = await axios.get('/films/' + slug, {
      headers,
    });
    return data;
  },

  async saveFilm(film_id: number) {
    const res = await axios.post('/film/save', {
      film_id,
    });
    return res;
  },

  async getBookmarks({ page }: { page: number }) {
    const filters = {
      page: String(page),
      limit: String(12),
    };

    const queryString = new URLSearchParams(filters).toString();
    const { data } = await axios.get(`/bookmarks?${queryString}`);
    return data;
  },
};
