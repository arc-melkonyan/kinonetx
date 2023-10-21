'use client';
import React from 'react';
import FilmsLayout from '@/layouts/FilmsLayout/layout';
import FilmCard from '@/components/templates/FilmCard';
import FilmSkeleton from '@/components/templates/FilmCard/Skeleton';
import { IFilm } from '@/types/film.interface';
import styles from './home.module.scss';
import { useQuery } from 'react-query';
import { FilmService } from '@/services/film.service';
import { useSelector } from 'react-redux';
import { selectSearch } from '@/redux/reducers/filters/selectors';
import Empty from '@/components/ui/Empty';

const Home = ({ films }: { films: { data: IFilm[]; pages: number } }) => {
  const [page, setPage] = React.useState(1);
  const search = useSelector(selectSearch);

  const { data, isLoading, isError, isSuccess, isPreviousData } = useQuery(
    ['films', page, search],
    () => FilmService.getAll({ page, search: search || '' }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      initialData: films,
    },
  );

  if (isError) {
    return (
      <div className={styles.error}>
        <span className={styles.icon}>☹️</span>
        <span className={styles.text}>Ошибка при получение фильмов</span>
      </div>
    );
  }

  if (!isSuccess || isPreviousData) {
    return (
      <FilmsLayout>
        {[...new Array(8)].map((_, index) => (
          <FilmSkeleton key={index} />
        ))}
      </FilmsLayout>
    );
  }

  if (!data.data.length) {
    return <Empty />;
  }

  return (
    <>
      <FilmsLayout>
        {isSuccess &&
          data.data.map((obj: IFilm, index: number) => <FilmCard key={index} {...obj} />)}
      </FilmsLayout>

      <div className={styles.pagination}>
        {data.pages <= page && data.pages != 1 && (
          <button onClick={() => setPage(page - 1)}>👈</button>
        )}
        {data.pages > page && <button onClick={() => setPage(page + 1)}>👉</button>}
      </div>
    </>
  );
};

export default Home;
