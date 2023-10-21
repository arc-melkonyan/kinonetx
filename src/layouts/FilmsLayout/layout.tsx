import styles from './FilmsLayout.module.scss';

const FilmsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default FilmsLayout;
