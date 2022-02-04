import { Document } from 'mongoose';

export interface UsuarioDocument extends Document {
  email: string;
  nombre: string;
  password: string;
  online: boolean;
  uid: string;
}

export interface MensajeDocument extends Document {
  de: string;
  para: string;
  mensaje: string;
  createdAt: string;
  updatedAt: string;
}
