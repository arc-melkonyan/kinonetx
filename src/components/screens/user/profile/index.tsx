'use client';
import React from 'react';
import styles from './UserProfile.module.scss';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
import Loading from '@/components/ui/Loading';

const UserProfile = () => {
  const [password, setPassword] = React.useState('');
  const { user, isLoading, Logout } = useUser({ redirect: '/auth/login' });

  if (isLoading) {
    return <Loading />;
  }

  if (user.name) {
    return (
      <div className={styles.root}>
        {/* {user.generatedPassword && (
        <div className={styles.warn}>
          <div className={styles.generatedPassword}>
            <span>
              У вас сгенерирован временный пароль. Пожалуйста, установите новый пароль, чтобы войти
              в аккаунт, используя вашу электронную почту и новый пароль.
            </span>
            <input
              type="password"
              placeholder="Новый пароль"
              name="knew_password"
              autoComplete="off"
              onChange={(e) => ''}
              value={password}
            />
            <button onClick={() => ''}>Сохранить</button>
          </div>
        </div>
      )} */}

        <div className={styles.info}>
          <Image
            className={styles.image}
            src={user.image}
            width={100}
            height={100}
            alt={user.name}
          />
          <span className={styles.name}>{user.name}</span>
        </div>

        <div className={styles.actions}>
          <button onClick={() => Logout()} className={styles.signout}>
            Выйти
          </button>
        </div>
      </div>
    );
  }
};

export default UserProfile;
