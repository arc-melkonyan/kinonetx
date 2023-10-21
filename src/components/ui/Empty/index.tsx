import styles from './empty.module.scss';
import Image from 'next/image';

const Empty = () => {
  return (
    <div className={styles.root}>
      <Image src="/images/empty.gif" alt="Empty" width={300} height={300} />
    </div>
  );
};

export default Empty;
