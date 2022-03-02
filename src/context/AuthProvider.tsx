import { useCallback, useMemo, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { nanoid } from 'nanoid';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { IJWTPayload } from '../types/mytypes';
import { ProviderResponse, ResponseUsuario } from '../types/respose';
import { AuthContext, IAuthUsuario } from './AuthContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function AuthProvider({ children }: Props) {
  const emptyUser: IJWTPayload = useMemo(
    () => ({
      nick: null,
      exp: null,
      iat: null,
      role: null,
      sala: null,
      game: null,
    }),
    [],
  );

  const [auth, setAuth] = useState<IAuthUsuario>({
    checking: true,
    logged: false,
    message: '',
    ...emptyUser,
  });

  const generarPassword = useCallback(() => {
    const pass = localStorage.getItem('password');
    if (!pass) {
      localStorage.setItem('password', nanoid(10));
    }
  }, []);

  const outRoom = useCallback(() => {
    localStorage.removeItem('token');
    setAuth({
      checking: false,
      logged: false,
      message: '',
      ...emptyUser,
    });
  }, [emptyUser]);

  const joinRoom = async (
    sala: string,
    nick: string,
  ): Promise<ProviderResponse> => {
    generarPassword();
    const password = localStorage.getItem('password');
    const resp = await fetchSinToken<ResponseUsuario>(
      'ingresar',
      {
        sala,
        nick,
        password,
      },
      'POST',
    );
    let error = '';
    if (resp.ok) {
      const { token } = resp;
      const decoded = jwt_decode<IJWTPayload>(token);
      localStorage.setItem('token', token);
      setAuth({
        checking: false,
        logged: true,
        message: '',
        ...decoded,
      });
    } else {
      error = resp.error;
    }
    return { ok: resp.ok, error };
  };

  const createRoom = async (
    nick: string,
    game: number,
  ): Promise<ProviderResponse> => {
    generarPassword();
    const password = localStorage.getItem('password');
    const resp = await fetchSinToken<ResponseUsuario>(
      'crear',
      {
        nick,
        game,
        password,
      },
      'POST',
    );
    let error = '';
    if (resp.ok) {
      const { token } = resp;
      localStorage.setItem('token', token);
      const decoded = jwt_decode<IJWTPayload>(token);
      setAuth({
        checking: false,
        logged: true,
        message: '',
        ...decoded,
      });
    } else {
      error = resp.error;
    }
    return { ok: resp.ok, error };
  };

  const verificarToken = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth({
        checking: false,
        logged: false,
        message: '',
        ...emptyUser,
      });
      return false;
    }
    const resp = await fetchConToken<ResponseUsuario>('validar', {});
    if (resp.ok) {
      const decoded = jwt_decode<IJWTPayload>(token);
      localStorage.setItem('token', resp.token);
      setAuth({
        checking: false,
        logged: true,
        message: '',
        ...decoded,
      });
      return true;
    }
    localStorage.removeItem('token');
    setAuth({
      checking: false,
      logged: false,
      message: resp.error,
      ...emptyUser,
    });
    return false;
  }, [emptyUser]);

  const clearMsg = useCallback(() => {
    setAuth((s) => ({
      ...s,
      message: '',
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        joinRoom,
        auth,
        createRoom,
        verificarToken,
        clearMsg,
        outRoom,
        generarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
