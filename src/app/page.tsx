import Home from '@/components/screens/home';
import { useQuery } from 'react-query';
import { FilmService } from '@/services/film.service';

const HomePage = async () => {
  const films = await FilmService.getAll({ page: 1, search: '' });

  return <Home films={films} />;
};

export default HomePage;
