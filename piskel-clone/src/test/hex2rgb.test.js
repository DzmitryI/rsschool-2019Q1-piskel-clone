import hex2rgb from '../utils/hex2rgb';

describe('Save.prototype.init', () => {
  it('Should be an instance of function', () => {
    expect(hex2rgb.hex2rgb).toBeInstanceOf(Function);
  });

  it('Should be a return of hex color', () => {
    const rgba = 'rgba(0,0,0)';
    const result = hex2rgb.hex2rgb(rgba);
    expect(result).toEqual('#000000');
  });
});
