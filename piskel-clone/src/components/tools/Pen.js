export default class Eraser {
  constructor(canvasData32, canvasData64, canvasData128, startX, startY, which) {
    this.form = document;
    this.canvasData32 = canvasData32;
    this.canvasData64 = canvasData64;
    this.canvasData128 = canvasData128;
    this.sizePen = 0;
    this.currentResizeCanvas = 0;
    this.startX = startX;
    this.startY = startY;
    this.which = which;
  }

  start() {
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const resizeArr = this.form.getElementsByName('resize');
    this.currentResizeCanvas = +[].filter.call(resizeArr, item => item.checked)[0].value;
    const penSize = document.querySelector('#pen-size').children;
    let currenPenSize = '';
    for (let i = 0; i < penSize.length; i += 1) {
      if (penSize[i].classList[2] === 'tools-conteiner__item_button-active') {
        // eslint-disable-next-line prefer-destructuring
        currenPenSize = penSize[i].classList[1];
      }
    }
    if (currenPenSize === 'pen-size-item2px') {
      this.sizePen = canvas.width / this.currentResizeCanvas;
    } else if (currenPenSize === 'pen-size-item3px') {
      this.sizePen = canvas.width / this.currentResizeCanvas * 2;
    } else if (currenPenSize === 'pen-size-item4px') {
      this.sizePen = canvas.width / this.currentResizeCanvas * 3;
    } else this.sizePen = 0;
    canvas.onmousemove = this.onmousemove.bind(this);
    canvas.onmouseup = () => { canvas.onmousemove = null; };
    canvas.onmouseout = () => {
      const frameConteiner = this.form.querySelector('.frame-container');
      let res;
      let curElem;
      for (let i = 0; i < frameConteiner.children.length; i += 1) {
        const element = frameConteiner.children[i];
        res = [].indexOf.call(element.classList, 'container-current-frame-activ');
        if (res !== -1) {
          // eslint-disable-next-line prefer-destructuring
          curElem = element.children[4];
          break;
        }
      }
      if (curElem) {
        const ctx = curElem.getContext('2d');
        ctx.clearRect(0, 0, curElem.width, curElem.height);
        // eslint-disable-next-line max-len
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, curElem.width, curElem.height);
      }
      canvas.onmousemove = null;
    };
    // const ctx = canvas.getContext('2d');
    let canvasData = [];
    if (this.currentResizeCanvas === 32) canvasData = this.canvasData32;
    else if (this.currentResizeCanvas === 64) canvasData = this.canvasData64;
    else if (this.currentResizeCanvas === 128) canvasData = this.canvasData128;
    const x = this.startX;
    const y = this.startY;
    this.currentPixel(canvas, canvasData, x, y);
  }

  onmousemove(event) {
    const canvas = event.target.parentNode.children[0];
    const resizeArr = this.form.getElementsByName('resize');
    const currentResize = +[].filter.call(resizeArr, item => item.checked)[0].value;
    let canvasData = [];
    if (currentResize === 32) canvasData = this.canvasData32;
    else if (currentResize === 64) canvasData = this.canvasData64;
    else if (currentResize === 128) canvasData = this.canvasData128;
    const x = event.offsetX;
    const y = event.offsetY;
    this.currentPixel(canvas, canvasData, x, y);
  }

  currentPixel(canvas, canvasData, startX, startY) {
    const primaryColor = this.form.querySelector('.color-conteiner__primary_item').value;
    const secondaryColor = this.form.querySelector('.color-conteiner__secondary_item').value;
    const { sizePen } = this;
    const ctx = canvas.getContext('2d');
    if (this.which === 1) ctx.fillStyle = primaryColor;
    else if (this.which === 3) ctx.fillStyle = secondaryColor;
    for (let i = 0; i < canvasData.length; i += 1) {
      const xi = canvasData[i][0] + canvasData[i][2];
      const yi = canvasData[i][1] + canvasData[i][3];
      if ((startX <= xi) && (startY <= yi)) {
        // eslint-disable-next-line max-len
        ctx.clearRect(canvasData[i][0] - sizePen, canvasData[i][1] - sizePen, canvasData[i][2] + sizePen, canvasData[i][3] + sizePen);
        // eslint-disable-next-line max-len
        ctx.fillRect(canvasData[i][0] - sizePen, canvasData[i][1] - sizePen, canvasData[i][2] + sizePen + 1, canvasData[i][3] + sizePen + 1);
        break;
      }
    }
  }
}
