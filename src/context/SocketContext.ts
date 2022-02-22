import { createContext } from 'react';
import { Socket } from 'socket.io-client';

const INITIAL_STATE: ISocketContext = {
  socket: null,
  online: false,
};

interface ISocketContext {
  socket: Socket | null;
  online: boolean;
}

export default createContext<ISocketContext>(INITIAL_STATE);
