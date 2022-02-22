import { SyntheticEvent, useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';

type IUsuario = {
  nick: string;
  puntos: number;
};

type IUsuario2 = {
  nick: string;
  puntos: number;
  online: boolean;
  _id: string;
};

type ISala = {
  word: string;
  valor1: number;
  valor2: number;
  valor3: number;
  usuarios: IUsuario2[];
};

type Iform = Omit<ISala, 'usuarios'>;

function TestRoom() {
  const { online, conectarSocket, socket } = useSocket(
    process.env.REACT_APP_API_HOST,
  );
  const [usuario, setUsuario] = useState<IUsuario>({ nick: 'AAA', puntos: 0 });
  const [sala] = useState<ISala>({
    word: 'BBB',
    valor1: -1,
    valor2: -2,
    valor3: -3,
    usuarios: [],
  });
  const [form, setform] = useState<Iform>({
    word: '',
    valor1: 0,
    valor2: 0,
    valor3: 0,
  });

  const onChange = (e: SyntheticEvent) => {
    const { target } = e;
    setform((f) => ({ ...f, [target.name]: target.value }));
  };
  useEffect(() => {
    conectarSocket('ahorcado');
  }, [conectarSocket]);

  useEffect(() => {
    socket?.on('yo', (data: IUsuario) => {
      setUsuario(data);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('status_room', (data) => {
      console.log('status_room', data);
    });
  }, [socket]);

  return (
    <div className="col">
      <div> TestRoom is online: {online ? 'online' : 'offline'}</div>
      <br />
      <div> TestRoom is nick: {usuario.nick}</div>
      <div> TestRoom is puntos: {usuario.puntos}</div>
      <br />
      <div> TestRoom is word: {sala.word}</div>
      <div> TestRoom is valor1: {sala.valor1}</div>
      <div> TestRoom is valor2: {sala.valor2}</div>
      <div> TestRoom is valor3: {sala.valor3}</div>
      <hr />
      <ul>
        {sala.usuarios.map((u) => {
          return (
            <li key={u._id}>
              {u.nick}, {u.puntos}, {u.online ? 'online' : 'offline'}
            </li>
          );
        })}
      </ul>
      <hr />
      <br />
      <input type="text" onChange={onChange} value={form.word} name="word" />
      <button
        type="button"
        onClick={() => {
          socket?.emit('start-game', form.word);
        }}
      >
        Set Word
      </button>

      <br />
      <br />
      <input
        type="text"
        onChange={onChange}
        value={form.valor1}
        name="valor1"
      />
      <button
        type="button"
        onClick={() => {
          socket?.emit('mod_valor1', form.valor1);
        }}
      >
        Set Valor1
      </button>

      <br />
      <br />
      <input
        type="text"
        onChange={onChange}
        value={form.valor2}
        name="valor2"
      />
      <button
        type="button"
        onClick={() => {
          socket?.emit('mod_valor2', form.valor2);
        }}
      >
        Set Valor2
      </button>

      <br />
      <br />
      <input
        type="text"
        onChange={onChange}
        value={form.valor3}
        name="valor3"
      />
      <button
        type="button"
        onClick={() => {
          socket?.emit('mod_valor3', form.valor3);
        }}
      >
        Set Valor3
      </button>
    </div>
  );
}

export default TestRoom;
