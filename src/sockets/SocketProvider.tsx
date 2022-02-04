import useSocket from '../hooks/useSocket';
import SocketContext from './SocketContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function SocketProvider({ children }: Props) {
  const { socket, online } = useSocket(process.env.REACT_APP_API_HOST);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
