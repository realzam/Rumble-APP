import { useContext, useEffect } from 'react';
import useSocket from '../hooks/useSocket';
import { AuthContext } from './AuthContext';
import SocketContext from './SocketContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function SocketProvider({ children }: Props) {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    process.env.REACT_APP_API_HOST,
  );
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (auth.logged) {
      conectarSocket('ahorcado');
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      console.log('Desconectar socket');
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
