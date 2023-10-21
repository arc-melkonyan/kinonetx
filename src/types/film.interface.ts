export interface IFilm {
  _id: number;
  slug: string;
  title: string;
  image: string;
  source: string;
  year: number;
  description: string;
  coutry: string;
  kp: number;
  saved?: boolean;
}
