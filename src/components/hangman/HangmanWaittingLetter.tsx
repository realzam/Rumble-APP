import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HangmanContext from '../../context/games/HangamanContext';
import HangmanAnimation from './HangmanAnimation';
import HangmanKeyboard from './HangmanKeyboard';
import SecretText from './SecretText';

function HangmanWaittingLetter() {
  const { auth } = useContext(AuthContext);
  const { gameData } = useContext(HangmanContext);
  const { letters, lifes } = gameData;
  return (
    <div style={{ position: 'relative' }}>
      <div className="hangman_challenge_by">
        Palabra de: <strong>{gameData.playerWord}</strong>
      </div>
      <div className="hangman_life">
        <i className="fas fa-heart" />{' '}
        <label>
          Vidas: <strong>{lifes}</strong>
        </label>
      </div>
      <div className="hangman_turn_letter">
        <i className="fas fa-heart" />{' '}
        <label>
          Turno de : <strong>{gameData.playerLetter}</strong>
        </label>
      </div>
      <div className="room__grid_cell hangman_main">
        <SecretText word={letters.join('')} />
        <div className="bc">
          {auth.nick !== gameData.playerWord && <HangmanKeyboard />}
          <div className="c">
            <HangmanAnimation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HangmanWaittingLetter;
