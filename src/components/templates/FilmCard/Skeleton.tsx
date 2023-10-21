import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './FilmCard.module.scss';

const FilmSkeleton = () => (
  <ContentLoader
    className={styles.item}
    speed={2}
    width={230}
    height={432}
    viewBox="0 0 230 432"
    backgroundColor="#ededed"
    foregroundColor="#dedede">
    <rect x="232" y="41" rx="0" ry="0" width="520" height="673" />
    <rect x="23" y="4" rx="10" ry="10" width="185" height="266" />
    <rect x="24" y="282" rx="5" ry="5" width="185" height="29" />
    <rect x="153" y="304" rx="0" ry="0" width="16" height="0" />
    <rect x="81" y="332" rx="6" ry="6" width="65" height="26" />
  </ContentLoader>
);

export default FilmSkeleton;
