import { createContext } from 'react';
import { IJWTPayload } from '../types/mytypes';
import { ProviderResponse } from '../types/respose';

export interface IAuthState {
  checking: boolean;
  logged: boolean;
  message: string;
}

export type IAuthUsuario = IAuthState & IJWTPayload;

export interface IAuth {
  auth: IAuthUsuario;
  joinRoom(sala: string, nick: string): Promise<ProviderResponse>;
  createRoom(nick: string, game: number): Promise<ProviderResponse>;
  verificarToken(): Promise<boolean>;
  clearMsg(): void;
  outRoom(): void;
  generarPassword(): void;
}

export const AuthContext = createContext<IAuth>({} as IAuth);
