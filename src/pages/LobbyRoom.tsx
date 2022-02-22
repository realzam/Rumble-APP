import { useContext } from 'react';
import HangmanLobby from '../components/hangman/HangmanLobby';
import { AuthContext } from '../context/AuthContext';

function LobbyRoom() {
  const { auth } = useContext(AuthContext);
  switch (auth.game) {
    case 'hangman':
      return <HangmanLobby />;

    default:
      return <div>no lobby</div>;
  }
}
export default LobbyRoom;
