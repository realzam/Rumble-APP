function Leaderboard() {
  const players = [
    { name: 'Sergio', points: 15, rank: 1 },
    { name: 'Ivan', points: 15, rank: 2 },
    { name: 'Tony', points: 15, rank: 3 },
    { name: 'Tony', points: 15, rank: 4 },
    { name: 'Tony', points: 15, rank: 5 },
    { name: 'Tony', points: 15, rank: 6 },
    { name: 'Tony', points: 15, rank: 7 },
    { name: 'Tony', points: 15, rank: 8 },
  ];
  return (
    <div className="room__grid_cell col leaderboard">
      <div className="leaderboard_title">
        <i className="fas fa-star" />
        Puntuaciones
      </div>
      <div className="leader_players_container">
        {players.map((player) => (
          <div
            className="leader_player_container"
            key={`${player.name}_${player.rank}`}
          >
            <img src="images/avatar.webp" alt="Avatar" className="avatar" />
            <div className="leader_player_info">
              <label>{player.name}</label>
              <label>
                <i className="fas fa-star" />
                {` ${player.points} puntos`}
              </label>
            </div>
            <div className="leader_player_rank">
              <label>#{player.rank}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
