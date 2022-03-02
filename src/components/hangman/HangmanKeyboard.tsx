import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HangmanContext from '../../context/games/HangamanContext';
import SocketContext from '../../context/SocketContext';

function HangmanKeyboard() {
  const letras: number[] = Array.from({ length: 26 }, (_, i) => i);
  const { socket } = useContext(SocketContext);
  const {
    auth: { nick },
  } = useContext(AuthContext);
  const {
    gameData: { lettersDisable, playerLetter, isFinish },
  } = useContext(HangmanContext);

  const discoverLetter = (letter: string) => {
    socket?.emit('discover-letter', letter);
  };

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
            disabled={
              lettersDisable.includes(code) || isFinish || nick !== playerLetter
            }
          >
            {char}
          </button>
        );
      })}
    </div>
  );
}

export default HangmanKeyboard;
