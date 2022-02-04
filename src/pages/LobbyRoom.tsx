// import { Link } from 'react-router-dom';

function LobbyRoom() {
  return (
    <div className="room__main col">
      <div className="room_grid">
        <div className="room__grid_cell col">
          <div className="cell_tile">
            <div className="cell_tile_decoration" />
            Ahorcado
          </div>
          <div className="room__cell_game_info_container">
            <div className="a">
              <img src="images/hangman.webp" alt="hangaman" />
            </div>
            <div className="b">
              <button className="btn btn-primary" type="button">
                Empezar juego
              </button>
            </div>
          </div>
        </div>

        <div className="room__grid_cell col">
          <div className="cell_tile">
            <div className="cell_tile_decoration" />
            Participantes
          </div>
          <div className="room__cell_players">
            <div className="room__player_chip">Tyler</div>
            <div className="room__player_chip">Townsend</div>
            <div className="room__player_chip">Woodcock</div>
            <div className="room__player_chip">Roosevelt</div>
            <div className="room__player_chip">Tyler</div>
          </div>
        </div>

        {/*         <div className="room__grid_cell col cell_expanded">
          <div className="cell_tile">
            <div className="cell_tile_decoration" />
            Configuraciones
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default LobbyRoom;
