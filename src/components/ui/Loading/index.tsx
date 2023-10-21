import Image from 'next/image';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <Image
      className={styles.image}
      src="/images/loading.png"
      width={120}
      height={120}
      alt="Loading..."
    />
  );
};

export default Loading;
