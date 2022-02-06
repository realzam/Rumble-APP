function HangmanKeyboard() {
  const letras: number[] = Array.from({ length: 26 }, (_, i) => i);
  return (
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
  );
}

export default HangmanKeyboard;
