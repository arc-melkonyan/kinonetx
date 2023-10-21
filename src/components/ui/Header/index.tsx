'use client';
import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import Image from 'next/image';
import { IconSearch, IconBookmarks, IconUser } from '@tabler/icons-react';
import { useAppDispatch } from '@/redux/store';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectSearch } from '@/redux/reducers/filters/selectors';
import { setSearch } from '@/redux/reducers/filters/slice';
import { AppProgressBar as ProgressBar, useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('search chnage');
    const value = event.target.value;
    dispatch(setSearch(value));
  };

  return (
    <>
      <ProgressBar height="4px" color="#157ee6" options={{ showSpinner: true }} shallowRouting />

      <header className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="/images/logo.png" alt="logo" width={74} height={74} />
            <span>KinoNetX</span>
          </div>
        </Link>

        <div className={styles.search}>
          <button
            onClick={() => {
              pathname !== '/' && router.push('/');
            }}>
            <IconSearch size={26} strokeWidth={2.4} />
          </button>
          <input
            value={search}
            type="text"
            placeholder="Поиск"
            onChange={onChangeSearch}
            name="ksearch__value"
            autoComplete="off"
          />
        </div>

        <div>
          <Link href="/bookmarks" className={styles.bookmarks}>
            <IconBookmarks stroke="#fff" strokeWidth={1.8} size={35} />
          </Link>

          <Link href="/user" className={styles.userProfile}>
            <IconUser stroke="#fff" fill="#fff" size={35} />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
