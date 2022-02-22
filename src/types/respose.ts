import { MensajeDocument } from './dbModels';

export interface IUsuario {
  nombre: string;
  email: string;
  online: boolean;
  uid: string;
}

export interface ResponseUsuario {
  ok: true;
  token: string;
}

export interface ReponseMensajes {
  ok: true;
  mensajes: MensajeDocument[];
}

export interface ResponseError {
  ok: false;
  error: string;
}

export interface ProviderResponse {
  ok: boolean;
  error: string;
}

export type ResponseOK = ResponseUsuario | ReponseMensajes;
