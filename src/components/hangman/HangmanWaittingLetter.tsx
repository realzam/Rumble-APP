import { SyntheticEvent, useContext, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../context/AuthContext';
import HangmanContext from '../../context/games/HangamanContext';
import SocketContext from '../../context/SocketContext';
import HangmanAnimation from './HangmanAnimation';
import HangmanKeyboard from './HangmanKeyboard';
import SecretText from './SecretText';

function HangmanWaittingLetter() {
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { gameData } = useContext(HangmanContext);
  const { letters, lifes } = gameData;
  const [word, setWord] = useState('');

  const onClick = () => {
    const w = word
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/[^a-zA-Z ]/g, '')
      .toUpperCase()
      .trim();
    if (w.length >= 3) {
      setWord('');
      socket?.emit('guess_word', w);
    }
  };

  const onChange = (e: SyntheticEvent) => {
    let { value } = e.target;
    value = value
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/[^a-zA-Z ]/g, '')
      .toUpperCase()
      .trimStart();
    setWord(value);
  };

  const todoOk = () =>
    word
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/[^a-zA-Z ]/g, '')
      .toUpperCase()
      .trim().length >= 3;

  return (
    <div style={{ position: 'relative' }}>
      <div className="hangman_challenge_by">
        <i className="fa-solid fa-feather-pointed" />
        Palabra de: <strong>{gameData.playerWord}</strong>
      </div>
      <div className="hangman_life">
        <i className="fas fa-heart" />{' '}
        <label>
          Vidas: <strong>{lifes}</strong>
        </label>
      </div>
      <div className="hangman_turn_letter">
        <i className="fa-solid fa-dice" />
        <label>
          Turno de : <strong>{gameData.playerLetter}</strong>
        </label>
      </div>
      <div
        className={classNames('room__grid_cell hangman_main', {
          'border_primary blink': auth.nick === gameData.playerLetter,
        })}
      >
        <SecretText word={letters.join('')} />
        <div className="bc">
          {auth.nick !== gameData.playerWord && <HangmanKeyboard />}
          <div className="c">
            <HangmanAnimation />
          </div>
        </div>
        {auth.nick !== gameData.playerWord && !gameData.isFinish ? (
          <>
            <label className="room__input-label">Adivinar palabra:</label>
            <div className="hangman-adivinar">
              <input
                className="room__input"
                type="text"
                onChange={onChange}
                value={word}
              />
              <button
                className="btn btn-primary"
                type="button"
                disabled={!todoOk()}
                onClick={onClick}
              >
                Adivinar
              </button>
            </div>
          </>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default HangmanWaittingLetter;
