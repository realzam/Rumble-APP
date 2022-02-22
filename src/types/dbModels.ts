import { Document } from 'mongoose';

export interface PlayerDocument {
  nick: string;
  role: string;
  sala: string;
  points: number;
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
