import { IFilm } from '@/types/film.interface';
import styles from './FilmCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const FilmCard = (params: IFilm) => {
  return (
    <div className={styles.item}>
      <Link href={`/film/${params._id}`}>
        <Image
          className={styles.pic}
          src={params.image}
          alt={params.title}
          width={180}
          height={270}
        />

        <span className={styles.title}>
          {params.title} ({params.year})
        </span>
      </Link>

      <div className={styles.rating}>
        <div className={styles.rating__item}>
          <Image src="/images/kp.jpg" alt="kp" width={24} height={24} />
          <span>{params.kp}</span>
        </div>
      </div>
    </div>
  );
};
export default FilmCard;
