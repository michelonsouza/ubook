import { generateRandomColor } from '@/utils';

const colorRegex = /#[A-za-z0-9]{6}/;

describe('generateRamdomColor suit', () => {
  it('should generateRamdomColor return coolor', () => {
    const color = generateRandomColor();
    const isColor = colorRegex.test(color);

    expect(isColor).toBe(true);
  });
});
