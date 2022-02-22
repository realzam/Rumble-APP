import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import HangmanProvider from '../context/games/HangmanProvider';
import HangmanEnv from './environments/HangmanEnv';

function GameEnvironment(): JSX.Element {
  const { auth } = useContext(AuthContext);
  switch (auth.game) {
    case 'Hangman':
      return (
        <HangmanProvider>
          <HangmanEnv />
        </HangmanProvider>
      );

    default:
      return <div>Empty</div>;
  }
}

export default GameEnvironment;
