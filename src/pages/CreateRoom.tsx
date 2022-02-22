import { SyntheticEvent, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Selector from '../components/Selector';
import { AuthContext } from '../context/AuthContext';

function CreateRoom() {
  const games = ['Ahorcado', 'Uno'];
  const { createRoom } = useContext(AuthContext);

  const [form, setForm] = useState({
    juego: 0,
    nick: '',
    rememberme: true,
  });

  useEffect(() => {
    const nick = localStorage.getItem('nick');
    if (nick) {
      setForm((f) => ({ ...f, nick }));
    }
  }, [setForm]);

  const setOption = (opt: number) => {
    setForm({ ...form, juego: opt });
  };

  const onChange = (e: SyntheticEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleCheck = () => {
    setForm({ ...form, rememberme: !form.rememberme });
  };

  const onSumbit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(form);
    if (form.rememberme) {
      localStorage.setItem('nick', form.nick);
    } else {
      localStorage.removeItem('nick');
    }

    const resp = await createRoom(form.nick, 0);
    if (!resp.ok) {
      Swal.fire('Error', resp.error, 'error');
    }
  };

  const todoOk = () => {
    return form.nick.length > 0;
  };

  return (
    <div className="room__main">
      <div className="card">
        <span className="card_title">
          <i className="fas fa-edit card__icon" />
          Crear sala
        </span>
        <form className="col" onSubmit={onSumbit}>
          <label className="room__input-label">Juego</label>
          <Selector
            id="game"
            options={games}
            option={form.juego}
            setOption={setOption}
          />

          <label className="room__input-label obligatory">Nick</label>
          <input
            className="room__input"
            placeholder="Nick name"
            type="text"
            name="nick"
            onChange={onChange}
            value={form.nick}
          />

          <div
            aria-hidden="true"
            className="col"
            onClick={() => {
              toggleCheck();
            }}
          >
            <input
              className="input-checkbox100"
              id="ckb1"
              type="checkbox"
              name="rememberme"
              onChange={onChange}
              checked={form.rememberme}
              readOnly
            />
            <label htmlFor="rememberme" className="label-checkbox100">
              Recordarme
            </label>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!todoOk()}
          >
            Crear
          </button>
        </form>
        <hr />
        <div className="rowr">
          Ya tienes sala?
          <Link className="link" to="/">
            Ingresar sala
          </Link>
        </div>
      </div>
    </div>
  );
}
export default CreateRoom;
