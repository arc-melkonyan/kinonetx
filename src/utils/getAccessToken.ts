import { setToken } from '@/redux/reducers/user/slice';
import store from '@/redux/store';
import { AuthService } from '@/services/auth.service';

function isTokenExpired(token: string) {
  const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;
  if (!token) {
    return true;
  }

  try {
    const tokenInfo = token.split('.')[1];
    const tokenInfoDecoded = window.atob(tokenInfo);
    const { exp, iat } = JSON.parse(tokenInfoDecoded);
    const tokenLeftTime = exp - Math.round(+new Date() / 1000);
    const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER;
    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (e) {
    console.error(e);
    return true;
  }
}

let refreshTokenRequest: any = null;
export default async function getAccessToken() {
  try {
    const accessToken = store.getState().user.access_token;
    if (!accessToken || isTokenExpired(accessToken)) {
      if (refreshTokenRequest === null) {
        refreshTokenRequest = await AuthService.refreshToken();
      }

      const { data } = refreshTokenRequest;
      refreshTokenRequest = null;

      store.dispatch(setToken(data.access_token));

      return data.access_token;
    }

    return accessToken;
  } catch (e) {
    console.error(e);
    return null;
  }
}
