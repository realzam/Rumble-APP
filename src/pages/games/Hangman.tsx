import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import HangmanContent from '../../components/hangman/HangmanContent';
import Leaderboard from '../../components/hangman/Leaderboard';
import HangmanContext from '../../context/games/HangamanContext';
// Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai
function Hangman() {
  const { isOver, gameData } = useContext(HangmanContext);
  const { letters } = gameData;
  useEffect(() => {
    if (isOver) {
      Swal.fire({
        icon: 'error',
        title: 'Game Over',
        text: `La palabra era: ${letters.join('')}`,
      });
    }
  }, [isOver, letters]);
  return (
    <div className="room__main col">
      <div className="hangman_grid">
        <Leaderboard />
        <HangmanContent />
      </div>
    </div>
  );
}

export default Hangman;
