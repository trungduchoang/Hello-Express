/**
 * generateAlphabet
 * @returns ["A", "B", ..., "Z"]
 */
export const generateAlphabet = () => {
  const alpha = Array.from(Array(26)).map((_, i) => i + 65);
  return alpha.map((x) => String.fromCharCode(x));
};
