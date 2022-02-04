interface Props {
  word: string;
}

interface Props2 {
  segment: string;
}

function SegmentText({ segment }: Props2) {
  return (
    <div className="hangman_segment_container">
      {segment
        .trim()
        .split('')
        .map((l, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="secret_letter" key={`${l}_${i}`}>
            {l}
          </div>
        ))}
    </div>
  );
}

function SecretText({ word }: Props) {
  const wordMod = word
    .trim()
    .toUpperCase()
    .replaceAll(/\s+/g, ' ')
    .split(' ')
    .filter((s) => s.trim().length > 0);
  return (
    <div className="secret_text_container">
      {wordMod.map((seg, i) => (
        <div key={seg} className="row">
          <SegmentText segment={seg} />
          {i < wordMod.length - 1 && <div className="secret_letter_space" />}
        </div>
      ))}
    </div>
  );
}

export default SecretText;
