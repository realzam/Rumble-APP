import { useContext } from 'react';
import HangmanContext from '../../context/games/HangamanContext';
import Hangman from '../../pages/games/Hangman';
import HangmanLobby from '../hangman/HangmanLobby';

function HangmanEnv() {
  const { room, isLoading } = useContext(HangmanContext);
  const { status } = room;

  if (isLoading) return <div />;
  switch (status) {
    case 'In lobby':
      return <HangmanLobby />;

    case 'In game':
      return <Hangman />;
    default:
      return <div />;
  }
}

export default HangmanEnv;
