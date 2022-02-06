import HangmanContent from '../../components/hangaman/HangmanContent';
import Leaderboard from '../../components/hangaman/Leaderboard';
// Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai
function Hangman() {
  return (
    <div className="room__main col">
      <div className="hangman_grid">
        <Leaderboard />
        <HangmanContent />
      </div>
    </div>
  );
}

export default Hangman;
