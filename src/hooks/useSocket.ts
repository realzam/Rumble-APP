import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState(false);

  const conectarSocket = useCallback(
    (namespace: string) => {
      const token = localStorage.getItem('token');
      const socketTemp = io(serverPath + namespace, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: {
          'x-token': token,
        },
      });
      setSocket(socketTemp);
    },
    [serverPath],
  );

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};

export default useSocket;
