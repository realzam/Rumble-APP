import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import HangmanContent from '../../components/hangman/HangmanContent';
import Leaderboard from '../../components/hangman/Leaderboard';
import { AuthContext } from '../../context/AuthContext';
import HangmanContext from '../../context/games/HangamanContext';
import SocketContext from '../../context/SocketContext';
// Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai
function Hangman() {
  const {
    auth: { nick },
  } = useContext(AuthContext);
  const {
    gameData: { playerWord },
  } = useContext(HangmanContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on('game_over', (w: string) => {
      console.log('game_over');
      // eslint-disable-next-line operator-linebreak
      const text =
        playerWord === nick ? 'Suerte para la proxima' : `La palabra era ${w}`;
      Swal.fire({
        icon: 'error',
        title: 'Oops... Perdiste :(',
        text,
      });
    });
  }, [socket, nick, playerWord]);

  useEffect(() => {
    socket?.on('winning_game', () => {
      console.log('winning_game');
      Swal.fire({
        icon: 'success',
        title: 'Que Pro',
        text: 'Gananaste',
      });
    });
  }, [socket]);

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
