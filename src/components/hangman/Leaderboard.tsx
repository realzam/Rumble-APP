import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../context/AuthContext';
import HangmanContext from '../../context/games/HangamanContext';
import SocketContext from '../../context/SocketContext';

interface UpdateInfo {
  player: string;
  puntos: number;
}

function Leaderboard() {
  const { auth, outRoom } = useContext(AuthContext);
  const { room } = useContext(HangmanContext);
  const { players } = room;
  const { socket } = useContext(SocketContext);
  const [animate, setAnimate] = useState('');
  const [points, setPuntos] = useState(false);

  useEffect(() => {
    socket?.on('update_points', ({ player, puntos }: UpdateInfo) => {
      setAnimate(player);
      setPuntos(puntos >= 0);
    });
  }, [socket]);

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="hangman_out"
        type="button"
        onClick={() => {
          outRoom();
        }}
      >
        <i className="fas fa-sign-out-alt" /> <label>Salir de la sala</label>
      </button>
      <div className="room__grid_cell col leaderboard">
        <div className="leaderboard_title">
          <i className="fas fa-star" />
          Puntuaciones
        </div>
        <div className="leader_players_container">
          {players.map((player, rank) => (
            <div
              className={classNames('leader_player_container', {
                border_primary: auth.nick === player.nick,
              })}
              key={player.uid}
            >
              <img src="/images/avatar.webp" alt="Avatar" className="avatar" />
              <div className="leader_player_info">
                <div className="row">
                  <label>{player.nick} </label>
                  <div
                    className="room__player_offline_chip"
                    hidden={player.online}
                  >
                    offline
                  </div>
                </div>
                <div>
                  <i className="fas fa-star" />
                  <label
                    className={
                      animate !== player.nick
                        ? ''
                        : classNames('animate__animated', {
                            animate__fadeInDown: !points,
                            animate__fadeInUp: points,
                          })
                    }
                  >
                    {` ${player.points} puntos`}
                  </label>
                </div>
              </div>
              <div className="leader_player_rank">
                <label>#{rank + 1}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
