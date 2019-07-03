const { hex2rgb } = require('../../utils/hex2rgb');

export default class ColorPicker {
  constructor(target, startX, startY, colorLayerData) {
    this.form = document;
    this.target = target;
    this.startX = startX;
    this.startY = startY;
    this.colorLayerData = colorLayerData;
  }

  start() {
    const newColor = hex2rgb(window.getComputedStyle(this.target).backgroundColor);
    this.form.querySelector('.color-conteiner__primary_item').value = newColor;
  }

  colorPixel(pixelPos) {
    const r = this.colorLayerData.data[pixelPos];
    const g = this.colorLayerData.data[pixelPos + 1];
    const b = this.colorLayerData.data[pixelPos + 2];
    return `rgba(${r},${g},${b})`;
  }

  startCanvas() {
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const pixelPos = (this.startY * canvas.clientWidth + this.startX) * 4;
    const hex = hex2rgb(this.colorPixel(pixelPos));
    this.form.querySelector('.color-conteiner__primary_item').value = hex;
  }
}
