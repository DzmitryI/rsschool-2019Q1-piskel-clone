const { hex2rgb } = require('../../utils/hex2rgb');
const { colorPixel } = require('../../utils/colorPixel');

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

  startCanvas() {
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const pixelPos = (this.startY * canvas.clientWidth + this.startX) * 4;
    const hex = hex2rgb(colorPixel(pixelPos, this.colorLayerData));
    this.form.querySelector('.color-conteiner__primary_item').value = hex;
  }
}
