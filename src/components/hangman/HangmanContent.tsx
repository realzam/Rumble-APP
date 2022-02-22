import { useContext } from 'react';
import HangmanContext from '../../context/games/HangamanContext';
import HangmanStoped from './HangmanStoped';
import HangmanWaittingLetter from './HangmanWaittingLetter';
import HangmanWaittingWord from './HangmanWaittingWord';

function HangmanContent() {
  const { gameData } = useContext(HangmanContext);
  switch (gameData.status) {
    case 'stoped':
      return <HangmanStoped />;
    case 'waitting letter':
      return <HangmanWaittingLetter />;
    case 'waitting word':
      return <HangmanWaittingWord />;
    default:
      return <HangmanStoped />;
  }
}

export default HangmanContent;
