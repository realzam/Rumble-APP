// import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HangmanContext from '../../context/games/HangamanContext';

function HangmanLobby() {
  const { auth, outRoom } = useContext(AuthContext);
  const { room, startGame } = useContext(HangmanContext);
  const { players } = room;

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
              <div className="col">
                <label>
                  ID de Sala:<h1>{auth.sala}</h1>
                </label>
                {auth.role === 'Host' && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={startGame}
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
