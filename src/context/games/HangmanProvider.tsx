import { useContext, useEffect, useState } from 'react';
import SocketContext from '../SocketContext';
import HangmanContext, {
  HangmanValues,
  HangmanRoom,
  HangmanData,
} from './HangamanContext';

interface Props {
  children: JSX.Element | JSX.Element[] | Element;
}

function HangmanProvider({ children }: Props) {
  const [state, setState] = useState<HangmanValues>({
    room: {
      players: [],
      status: 'In lobby',
    },
    gameData: {
      letters: [],
      lettersDisable: [],
      lifes: 0,
      status: 'waitting word',
      playerWord: '',
      playerLetter: '',
    },
    isOver: false,
    segment: 0,
    isLoading: true,
  });
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on('init', () => {
      // console.log('init');
      setState((s) => ({ ...s, isLoading: false }));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('status_room', (info: HangmanRoom) => {
      // console.log('current-status', info);
      setState((s) => ({ ...s, room: info }));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('status_hangman', (info: HangmanData) => {
      // console.log('status_hangman', info);
      setState((s) => ({ ...s, gameData: info }));
    });
  }, [socket, state.room.players]);
  /*
  useEffect(() => {
    socket?.on('current-status', (info: SocketState) => {
      console.log('current-status', info);
      setState((s) => ({ ...s, ...info }));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('player_list', (players: PlayerDocument[]) => {
      setState((s) => {
        return { ...s, players };
      });
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('game-over', (info: SocketState) => {
      setState({ ...info, isOver: true, segment: 7 });
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('status-room', (status: string) => {
      setState((s) => ({ ...s, estado: status }));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('error-discover-letter', (segment: number) => {
      setState((s) => ({ ...s, segment }));
    });
  }, [socket]);
*/
  const startGame = () => {
    socket?.emit('start_game');
  };

  const discoverLetter = (letter: string) => {
    socket?.emit('discover-letter', letter);
  };

  return (
    <HangmanContext.Provider value={{ ...state, startGame, discoverLetter }}>
      {children}
    </HangmanContext.Provider>
  );
}

export default HangmanProvider;
