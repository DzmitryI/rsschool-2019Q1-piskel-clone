import './index.scss';

export default class Resize {
  constructor() {
    this.form = document;
    this.currentSize = null;
  }

  init() {
    const resizeButton = this.form.querySelector('.resize-button');
    const resizeArr = this.form.getElementsByName('resize');
    const cursorCoordinates = this.form.querySelector('.cursor-coordinates');
    this.currentSize = +[].filter.call(resizeArr, item => item.checked)[0].value;
    cursorCoordinates.innerHTML = `[ ${this.currentSize}x${this.currentSize} ]`;
    resizeButton.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown() {
    const cursorCoordinates = this.form.querySelector('.cursor-coordinates');
    const resizeArr = this.form.getElementsByName('resize');
    this.currentResize = +[].filter.call(resizeArr, item => item.checked)[0].value;
    cursorCoordinates.innerHTML = `[ ${this.currentResize}x${this.currentResize} ]`;
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,550,255,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
