import './index.scss';
import pentIcon from './assets/icons/tool-pen.png';
// import paintBacketIcon from './assets/icons/paint_backet.png';
import chooseColorIcon from './assets/icons/choose_color.png';
import moveIcon from './assets/icons/move.png';
import transformBacketIcon from './assets/icons/transform.png';
import swapColrsIcon from './assets/icons/swap_color.png';

export default class Index {
  constructor() {
    this.form = document;
    this.canvasData = [];
    this.size = 0;
  }

  start() {
    const penSize = this.form.querySelector('.pen-size-item1px');
    penSize.classList.add('tools-conteiner__item_button-active');
    const pen = this.form.getElementById('paint-backet');
    pen.src = pentIcon;
    // const paintBacket = this.form.getElementById('paint-backet');
    // paintBacket.src = paintBacketIcon;
    const chooseColor = this.form.getElementById('choose-color');
    chooseColor.src = chooseColorIcon;
    const move = this.form.getElementById('move');
    move.src = moveIcon;
    const transform = this.form.getElementById('transform');
    transform.src = transformBacketIcon;
    const swapColors = this.form.getElementById('swap-colors');
    swapColors.src = swapColrsIcon;

    const canvas = this.form.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const x = canvas.width / 32;
    const canvasData = [];
    for (let i = 0; i < 32; i += 1) {
      for (let j = 0; j < 32; j += 1) {
        canvasData.push([j * x, i * x, x, x]);
        ctx.fillRect(j * x, i * x, x, x);
      }
    }
    this.canvasData = canvasData;
    canvas.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown(event) {
    const penTool = document.querySelector('#pen-tool');
    if (penTool.classList[1] === 'tools-conteiner__item_button-active') {
      const penSize = document.querySelector('#pen-size').children;
      const myColor = this.form.querySelector('.color-conteiner__primary_item').value;
      const canvas = event.target.parentNode.children[0];
      let currenPenSize = '';
      for (let i = 0; i < penSize.length; i += 1) {
        if (penSize[i].classList[2] === 'tools-conteiner__item_button-active') {
          // eslint-disable-next-line prefer-destructuring
          currenPenSize = penSize[i].classList[1];
        }
      }
      if (currenPenSize === 'pen-size-item2px') {
        this.size = canvas.width / 32;
      } else if (currenPenSize === 'pen-size-item3px') {
        this.size = canvas.width / 32 * 2;
      } else if (currenPenSize === 'pen-size-item4px') {
        this.size = canvas.width / 32 * 3;
      } else this.size = 0;
      canvas.onmousemove = this.onmousemove.bind(this);
      canvas.onmouseup = () => {
        canvas.onmousemove = null;
      };
      const ctx = canvas.getContext('2d');
      const { canvasData } = this;
      ctx.fillStyle = myColor;
      const x = event.offsetX;
      const y = event.offsetY;

      for (let i = 0; i < canvasData.length; i += 1) {
        const xi = canvasData[i][0] + canvasData[i][2];
        const yi = canvasData[i][1] + canvasData[i][3];
        if ((x <= xi) && (y <= yi)) {
          // eslint-disable-next-line max-len
          ctx.fillRect(canvasData[i][0] - this.size, canvasData[i][1] - this.size, canvasData[i][2] + this.size, canvasData[i][3] + this.size);
          break;
        }
      }
    }
  }

  onmousemove(event) {
    const myColor = this.form.querySelector('.color-conteiner__primary_item').value;
    const canvas = event.target.parentNode.children[0];
    const ctx = canvas.getContext('2d');
    const { canvasData } = this;
    ctx.fillStyle = myColor;
    const x = event.offsetX;
    const y = event.offsetY;
    window.console.log(x, y);
    for (let i = 0; i < canvasData.length; i += 1) {
      const xi = canvasData[i][0] + canvasData[i][2];
      const yi = canvasData[i][1] + canvasData[i][3];
      if ((x <= xi) && (y <= yi)) {
        // eslint-disable-next-line max-len
        ctx.fillRect(canvasData[i][0] - this.size, canvasData[i][1] - this.size, canvasData[i][2] + this.size, canvasData[i][3] + this.size);
        break;
      }
    }
  }
}
