import { PlayerDocument } from './dbModels';

export interface SocketState {
  players: PlayerDocument[];
  estado: string;
  letters: string[];
  lettersDisable: number[];
  vidas: number;
}
