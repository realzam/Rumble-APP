import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import HangmanContext from '../../context/games/HangamanContext';
import SocketContext from '../../context/SocketContext';
import SecretText from './SecretText';

function HangmanWaittingWord() {
  const { socket } = useContext(SocketContext);
  const { gameData } = useContext(HangmanContext);
  const { auth } = useContext(AuthContext);
  const [word, setWord] = useState('');

  useEffect(() => {
    socket?.on('input_word', () => {
      console.log('input_word');
      Swal.fire({
        title: 'Es tu turno, escribe la palabra para jugar',
        width: 600,
        padding: '3em',
        color: '#0085ff',
        background: '#fff',
        backdrop: `
          rgba(0,93,179,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
    });
  }, [socket]);

  const onClick = () => {
    const w = word
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/[^a-zA-Z ]/g, '')
      .toUpperCase()
      .trim();
    if (w.length >= 3) {
      console.log('emitting start_word');
      socket?.emit('start_word', w);
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
      <div className="room__grid_cell hangman_main">
        {auth.nick === gameData.playerWord ? (
          <>
            <SecretText word={word !== '' ? word : 'KIMI NO NA WA'} />
            <div className="col">
              <label className="room__input-label obligatory">Palabra:</label>
              <input
                className="room__input"
                placeholder="KIMI NO NA WA"
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
                Ingresar
              </button>
            </div>
          </>
        ) : (
          <h1>Esperando a {gameData.playerWord}</h1>
        )}
      </div>
    </div>
  );
}

export default HangmanWaittingWord;
