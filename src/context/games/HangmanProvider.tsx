import { useContext, useEffect, useState, useMemo } from 'react';
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
  const soundErrorLetter = useMemo(
    () => new Audio('/sounds/wrong-letter.mp3'),
    [],
  );

  const soundCorrectLetter = useMemo(
    () => new Audio('/sounds/correct-letter.mp3'),
    [],
  );

  const soundFinishGame = useMemo(
    () => new Audio('/sounds/finish-game.mp3'),
    [],
  );

  const soundGameOver = useMemo(() => new Audio('/sounds/game-over.mp3'), []);

  const soundWinningGame = useMemo(
    () => new Audio('/sounds/winnig-game.mp3'),
    [],
  );

  const soundPopUp = useMemo(() => new Audio('/sounds/pop-up.mp3'), []);

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
      isFinish: false,
    },
    segment: 0,
    isLoading: true,
  });
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on('init', () => {
      setState((s) => ({ ...s, isLoading: false }));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('status_room', (info: HangmanRoom) => {
      setState((s) => ({ ...s, room: info }));
    });
    return () => {
      socket?.removeAllListeners('status_room');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('status_hangman', (info: HangmanData) => {
      setState((s) => ({ ...s, gameData: info }));
    });
    return () => {
      socket?.removeAllListeners('status_hangman');
    };
  }, [socket, state.room.players]);

  useEffect(() => {
    socket?.on('sound_error_letter', () => {
      if (soundErrorLetter.paused) {
        soundErrorLetter.play();
      } else {
        soundErrorLetter.currentTime = 0;
      }
    });
  }, [socket, soundErrorLetter]);

  useEffect(() => {
    socket?.on('sound_correct_letter', () => {
      if (soundCorrectLetter.paused) {
        soundCorrectLetter.play();
      } else {
        soundCorrectLetter.currentTime = 0;
      }
    });
  }, [socket, soundCorrectLetter]);

  useEffect(() => {
    socket?.on('sound_finis_game', () => {
      soundFinishGame.play();
    });
  }, [socket, soundFinishGame]);

  useEffect(() => {
    socket?.on('sound_game_over', () => {
      soundGameOver.play();
    });
  }, [socket, soundGameOver]);

  useEffect(() => {
    socket?.on('sound_winning_game', () => {
      soundWinningGame.play();
    });
  }, [socket, soundWinningGame]);

  useEffect(() => {
    socket?.on('sound_pop-up', () => {
      soundPopUp.play();
    });
  }, [socket, soundPopUp]);

  return (
    <HangmanContext.Provider value={{ ...state }}>
      {children}
    </HangmanContext.Provider>
  );
}

export default HangmanProvider;
