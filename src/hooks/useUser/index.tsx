import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserData } from '@/redux/reducers/user/selectors';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { useAppDispatch } from '@/redux/store';
import { setToken, setUser } from '@/redux/reducers/user/slice';

const useUser = ({ redirect }: { redirect: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUserData);
  const accessToken = useSelector(selectAccessToken);
  const [isLoading, setIsLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(true);

  const Logout = () => {
    setRefresh(false);

    AuthService.logout().then((res) => {
      dispatch(setToken(''));
      dispatch(setUser(''));
      router.push('/');
    });
  };

  React.useEffect(() => {
    if (refresh) {
      setIsLoading(true);

      AuthService.getProfile()
        .then(({ data }) => {
          if (data) {
            return dispatch(setUser(data));
          }
        })
        .catch((err) => router.push(redirect));

      setIsLoading(false);
    }
  }, []);

  return { user, isLoading, Logout };
};

export default useUser;
