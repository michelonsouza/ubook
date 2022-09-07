const colors = [
  '#fa8d68',
  '#90d26c',
  '#68a0fa',
  '#fab668',
  '#8368fa',
  '#fa68b5',
  '#5fe2c4',
  '#f55a5a',
];

export function generateRandomColor(): string {
  const index = Math.floor(Math.random() * colors.length);
  const color = colors[index] || colors[0];

  return color;
}
