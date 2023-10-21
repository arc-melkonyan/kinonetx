'use client';
import React from 'react';
import styles from './bookmarks.module.scss';
import { useQuery } from 'react-query';
import { IFilm } from '@/types/film.interface';
import { FilmService } from '@/services/film.service';
import FilmsLayout from '@/layouts/FilmsLayout/layout';
import FilmSkeleton from '@/components/templates/FilmCard/Skeleton';
import FilmCard from '@/components/templates/FilmCard';
import { redirect } from 'next/navigation';
import axios from 'axios';
import Empty from '@/components/ui/Empty';

const Bookmarks = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isError, error, isSuccess, isPreviousData } = useQuery(
    ['films', page],
    () => FilmService.getBookmarks({ page }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );

  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      redirect('/auth/login');
    }

    return (
      <div className={styles.error}>
        <span className={styles.icon}>☹️</span>
        <span className={styles.text}>Ошибка при получение фильмов</span>
      </div>
    );
  }

  if (isLoading || isPreviousData) {
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

export default Bookmarks;
