// import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HangmanContext from '../../context/games/HangamanContext';
import SocketContext from '../../context/SocketContext';
import InfoBolder from '../InfoBolder';

function HangmanLobby() {
  const { socket } = useContext(SocketContext);
  const { auth, outRoom } = useContext(AuthContext);
  const { room } = useContext(HangmanContext);
  const { players } = room;

  const startGame = () => {
    socket?.emit('start_game');
  };

  return (
    <div className="room__main col">
      <div className="room_grid">
        <div style={{ position: 'relative' }}>
          <button
            className="hangman_out"
            type="button"
            onClick={() => {
              outRoom();
            }}
          >
            <i className="fas fa-sign-out-alt" />{' '}
            <label>Salir de la sala</label>
          </button>
          <div className="room__grid_cell col">
            <div className="cell_tile">
              <div className="cell_tile_decoration" />
              Ahorcado
            </div>
            <div className="room__cell_game_info_container">
              <div className="a">
                <img src="/images/hangman.webp" alt="hangaman" />
              </div>
              <div className="hangman_config">
                <InfoBolder title="ID Sala" value={auth.sala as string} />

                {auth.role === 'Host' && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={startGame}
                    disabled={
                      players.filter((p) => p.online === true).length < 2
                    }
                  >
                    Empezar juego
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="room__grid_cell col">
          <div className="cell_tile">
            <div className="cell_tile_decoration" />
            Participantes
          </div>
          <div className="room__cell_players">
            {players.map((player) => (
              <div
                className="room__player_chip"
                hidden={!player.online}
                key={player.uid}
              >
                {player.nick}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HangmanLobby;
