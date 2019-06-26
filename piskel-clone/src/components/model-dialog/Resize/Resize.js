import './index.scss';

export default class Resize {
  constructor() {
    this.form = document;
    this.currentSize = null;
  }

  init() {
    const resizeButton = this.form.querySelector('.resize-button');
    const resizeArr = this.form.getElementsByName('resize');
    this.currentSize = +[].filter.call(resizeArr, item => item.checked)[0].value;
    resizeButton.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown() {
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
