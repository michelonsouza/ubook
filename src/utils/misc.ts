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
  const color = colors[index];

  return color;
}

export function verifyIsNewContact(createdAt: string, limit = 10000): boolean {
  const formatedDate = new Date(createdAt).getTime() + limit;
  const difference = formatedDate - new Date().getTime();

  return difference > 0;
}
