export default function isPlural(word, value) {
  return value > 0 ? `${value} ${word}s` : `${value} ${word}`;
}
