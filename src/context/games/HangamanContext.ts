import { createContext } from 'react';
import { PlayerDocument } from '../../types/dbModels';

export type StatusHangman = 'waitting word' | 'waitting letter' | 'stoped';

export interface HangmanRoom {
  players: PlayerDocument[];
  status: 'In game' | 'In lobby';
}

export interface HangmanData {
  letters: string[];
  lettersDisable: number[];
  lifes: number;
  status: StatusHangman;
  playerWord: string;
  playerLetter: string;
}

export interface HangmanValues {
  room: HangmanRoom;
  gameData: HangmanData;
  isOver: boolean;
  segment: number;
  isLoading: boolean;
}

export type HangmanGame = HangmanValues;

const HangmanContext = createContext<HangmanGame>({} as HangmanGame);

export default HangmanContext;
