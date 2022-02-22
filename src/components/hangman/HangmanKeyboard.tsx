import { useContext } from 'react';
import HangmanContext from '../../context/games/HangamanContext';

function HangmanKeyboard() {
  const letras: number[] = Array.from({ length: 26 }, (_, i) => i);
  const { gameData, discoverLetter, isOver } = useContext(HangmanContext);
  const { lettersDisable } = gameData;
  return (
    <div className="hangman_keyboard">
      {letras.map((i) => {
        const code = 65 + i;
        const char = String.fromCharCode(65 + i);
        return (
          <button
            key={`key_${char}`}
            className="hangman_key"
            type="button"
            onClick={() => {
              discoverLetter(char);
            }}
            disabled={lettersDisable.includes(code) || isOver}
          >
            {char}
          </button>
        );
      })}
    </div>
  );
}

export default HangmanKeyboard;
