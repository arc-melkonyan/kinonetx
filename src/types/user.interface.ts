import { IFilm } from './film.interface';

export type TypeUser = {
  name: string;
  image: string;
};

export interface IUserState {
  access_token: string;
  user: TypeUser;
}
