import SecretText from '../../components/hangaman/SecretText';
// Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai
function Hangman() {
  const w = 'Hola        mundo \n xd';
  const letras: number[] = Array.from({ length: 26 }, (_, i) => i);
  return (
    <div className="room__main col">
      <div className="hangman_grid">
        <div className="room__grid_cell col">
          <div className="d">d</div>
        </div>
        <div className="room__grid_cell hangman_main">
          <SecretText word={w} />
          <div className="hangman_keyboard">
            {letras.map((i) => {
              const char = String.fromCharCode(65 + i);
              return (
                <div key={`key_${char}`} className="hangman_key">
                  {char}
                </div>
              );
            })}
          </div>
          <div className="c">c</div>
        </div>
      </div>
    </div>
  );
}

export default Hangman;
