'use client';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './register.module.scss';
import MainButton from '@/components/ui/MainButton';
import { IconPhoto, IconUser } from '@tabler/icons-react';
import axios from '@/axios';
import Image from 'next/image';
import useMessage from '@/hooks/useMessage';
import Message from '@/components/ui/Message';
import { AuthService } from '@/services/auth.service';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { setToken } from '@/redux/reducers/user/slice';
import Link from 'next/link';

interface IFormValues {
  email: string;
  name: string;
  password: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { setMessageData, messageData, handleMessageClose } = useMessage();
  const initialValues: IFormValues = { email: '', name: '', password: '' };
  const [imageUrl, setImageUrl] = React.useState('');
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = ({ email, name, password }: IFormValues) => {
    AuthService.register({ email, name, password, image: imageUrl })
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

  const handleChangeImage = async (event: any) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);
      setImageUrl(process.env.NEXT_PUBLIC_API_URL + data.url);
    } catch (error: any) {
      let message = '';

      if (error.response?.data) {
        message = error.response.data.error;
      } else {
        message = 'Ошибка загрузки файла';
      }

      setMessageData({ text: message, status: false });
    }
  };

  return (
    <div className={styles.main}>
      <Message message={messageData} onClose={handleMessageClose} />
      <h1 className={styles.title}>Регистрация</h1>

      <Formik
        initialValues={{ email: '', name: '', password: '' }}
        onSubmit={(values) => handleSubmit(values)}>
        <Form>
          <input ref={imageInputRef} onChange={handleChangeImage} type="file" hidden />
          <button
            onClick={() => imageInputRef.current?.click()}
            className={styles.pickImageButton}
            type="button">
            {imageUrl ? (
              <Image width={100} height={100} alt="image" src={imageUrl} />
            ) : (
              <IconPhoto
                width={50}
                height={50}
                strokeWidth={1.5}
                strokeLinejoin="round"
                color="#ffffff"
              />
            )}
          </button>
          <Field name="email" placeholder="E-mail" type="email" />
          <Field name="name" placeholder="Имя" type="text" />
          <Field name="password" placeholder="Пароль" type="password" />

          <div style={{ marginTop: '2.5rem' }}>
            <MainButton type="submit">Регистрация</MainButton>
          </div>
        </Form>
      </Formik>

      <div className={styles.info}>
        <span>Уже зарегистрированы?</span>
        <Link href="/auth/login"> Войти</Link>
      </div>
    </div>
  );
};

export default Register;
