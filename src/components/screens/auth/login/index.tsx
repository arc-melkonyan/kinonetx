'use client';
import React from 'react';
import styles from './login.module.scss';
import MainButton from '@/components/ui/MainButton';
import { AuthService } from '@/services/auth.service';
import { useAppDispatch } from '@/redux/store';
import { setToken, setUser } from '@/redux/reducers/user/slice';
import { useRouter } from 'next/navigation';
import useMessage from '@/hooks/useMessage';
import Message from '@/components/ui/Message';
import Link from 'next/link';

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { setMessageData, handleMessageClose, messageData } = useMessage();
  const [error, setError] = React.useState('');

  const [data, setData] = React.useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const submitForm = async () => {
    AuthService.login({
      email: data.email,
      password: data.password,
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch(setToken(data.data.access_token));
          router.push('/user');
        }
      })
      .catch((error) => {
        if (error.response?.data) {
          const data = error.response?.data;

          if (error.response?.status === 400) {
            if (data.message) {
              setMessageData({ text: data.message, status: false });
            }
            if (data[0] && data[0].type === 'field') {
              setMessageData({ text: data[0].msg, status: false });
            }
          }
        }
      });
  };

  return (
    <div className={styles.main}>
      <Message message={messageData} onClose={handleMessageClose} />
      <h1 className={styles.title}>Войти</h1>

      <input
        autoComplete="off"
        type="email"
        value={data.email}
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        autoComplete="false"
        type="password"
        value={data.password}
        placeholder="Пароль"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      {error && <div className={styles.error}>{error}</div>}

      <div style={{ marginTop: '2.5rem' }}>
        <MainButton onClick={() => submitForm()}>Войти</MainButton>
      </div>

      <div className={styles.info}>
        <span>Нет аккаунта?</span>
        <Link href="/auth/register"> Зарегистрироваться</Link>
      </div>
    </div>
  );
};

export default Login;
