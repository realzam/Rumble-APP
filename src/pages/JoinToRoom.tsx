import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function JoinToRoom() {
  const [form, setForm] = useState({
    rom: '',
    nick: '',
    rememberme: true,
  });

  useEffect(() => {
    const nick = localStorage.getItem('nick');
    if (nick) {
      setForm((f) => ({ ...f, nick }));
    }
  }, [setForm]);

  const onChange = (e: SyntheticEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleCheck = () => {
    setForm({ ...form, rememberme: !form.rememberme });
  };

  const onSumbit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (form.rememberme) {
      localStorage.setItem('nick', form.nick);
    } else {
      localStorage.removeItem('nick');
    }
  };

  const todoOk = () => {
    return form.rom.length > 0 && form.nick.length > 0;
  };

  return (
    <div className="room__main">
      <div className="card">
        <span className="card_title">
          <i className="fas fa-sign-in-alt card__icon" />
          Ingresar a sala
        </span>
        {/* <div className="mb-15">
          Become a member youll enyot exclusive deals. offers invites and reweds
        </div>
        <hr /> */}
        <form className="col" onSubmit={onSumbit}>
          <label className="room__input-label obligatory">ID de Sala</label>
          <input
            className="room__input"
            placeholder="XXXXX"
            type="text"
            name="rom"
            onChange={onChange}
            value={form.rom}
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
            Ingresar
          </button>
        </form>
        <hr />
        <div className="row">
          No tienes una sala?
          <Link className="link" to="/crear">
            Crear sala
          </Link>
        </div>
      </div>
    </div>
  );
}
export default JoinToRoom;
