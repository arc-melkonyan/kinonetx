'use client';
import React from 'react';
import { IFilm } from '@/types/film.interface';
import styles from './film.module.scss';
import Image from 'next/image';
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { FilmService } from '@/services/film.service';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const Film = (data: IFilm) => {
  const router = useRouter();
  const [showDescription, setShowDescription] = React.useState(false);
  const [filmSaved, setFilmSaved] = React.useState(data.saved ? data.saved : false);

  const saveFilm = async (film_id: number) => {
    setFilmSaved(!filmSaved);

    FilmService.saveFilm(film_id)
      .then((res) => {
        const { data } = res;
        setFilmSaved(data.status);
        router.refresh();
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          router.push('/auth/login');
        } else {
          setFilmSaved(false);
        }
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.actions}>
          <button onClick={() => setShowDescription(!showDescription)}>
            {showDescription ? 'Скрыть' : 'О фильме'}
          </button>

          <button onClick={() => saveFilm(data._id)}>
            {filmSaved ? (
              <IconBookmarkFilled color="#fff" width={24} height={24} />
            ) : (
              <IconBookmark color="#fff" width={24} height={24} />
            )}
          </button>
        </div>

        <Image className={styles.pic} src={data.image} alt={data.title} width={185} height={275} />
        <span className={styles.title}>
          {data.title} ({data.year})
        </span>

        <div className={styles.ratings}>
          <div className={styles.rating}>
            <Image src="/images/kp.jpg" alt="kp" width={24} height={24} />
            <span>{data.kp}</span>
          </div>
        </div>
      </div>

      {showDescription ? (
        <div className={styles.description}>{data.description}</div>
      ) : (
        <div className={styles.player}>
          <iframe
            src={data.source}
            title="Человек Собаке Друг / 06.10.2023"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
      )}
    </div>
  );
};

export default Film;
