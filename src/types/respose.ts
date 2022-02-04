import { MensajeDocument } from './dbModels';

export interface IError {
  value: string;
  param: string;
  location: string;
  msg: string;
}

export interface IUsuario {
  nombre: string;
  email: string;
  online: boolean;
  uid: string;
}

export interface ResponseUsuario {
  ok: true;
  status: number;
  usuario: IUsuario;
  token: string;
}

export interface ReponseMensajes {
  ok: true;
  status: number;
  mensajes: MensajeDocument[];
}

export interface ResponseError {
  ok: false;
  status: number;
  errors: IError[];
}

export interface ProviderResponse {
  ok: boolean;
  error: string;
}

export type ResponseOK = ResponseUsuario | ReponseMensajes;
