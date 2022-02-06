// import useLottie from '../../hooks/useLottie';
import useLottie from '../../hooks/useLottie';
import HangmanKeyboard from './HangmanKeyboard';
import SecretText from './SecretText';

function HangmanContent() {
  const w = 'Hola mundo xd';

  const [HangmanAnimation] = useLottie({
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'animation/hangman.json',
    name: 'hangman',
  });

  return (
    <div className="room__grid_cell hangman_main">
      <SecretText word={w} />
      <div className="bc">
        <HangmanKeyboard />
        <div className="c">
          <HangmanAnimation />
        </div>
      </div>
    </div>
  );
}

export default HangmanContent;
