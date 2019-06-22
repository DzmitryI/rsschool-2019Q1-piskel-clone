import './index.scss';
import penIcon from './assets/icons/tool-pen.png';
import paintBacketIcon from './assets/icons/tool-paint-bucket.png';
// import chooseColorIcon from './assets/icons/choose_color.png';
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
    const pen = this.form.getElementById('tool-pen-img');
    pen.src = penIcon;
    const paintBacket = this.form.getElementById('tool-paint-bucket-img');
    paintBacket.src = paintBacketIcon;
    // const chooseColor = this.form.getElementById('choose-color');
    // chooseColor.src = chooseColorIcon;
    const move = this.form.getElementById('move');
    move.src = moveIcon;
    const transform = this.form.getElementById('transform');
    transform.src = transformBacketIcon;
    const swapColors = this.form.getElementById('swap-colors');
    swapColors.src = swapColrsIcon;

    const canvas = this.form.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'brown';

    const x = canvas.width / 32;
    const canvasData = [];
    for (let i = 0; i < 32; i += 1) {
      for (let j = 0; j < 32; j += 1) {
        canvasData.push([j * x, i * x, x, x, j, i, 'brown']);
        ctx.fillRect(j * x, i * x, x, x);
      }
    }
    ctx.fillRect(0, 0, 400, 400);
    this.canvasData = canvasData;
    canvas.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown(event) {
    const toolPen = document.querySelector('#tool-pen');
    const toolPaintBucket = document.querySelector('#tool-paint-bucket');
    if (toolPen.classList[1] === 'tools-conteiner__item_button-active') {
      const penSize = document.querySelector('#pen-size').children;
      const primaryColor = this.form.querySelector('.color-conteiner__primary_item').value;
      const secondaryColor = this.form.querySelector('.color-conteiner__secondary_item').value;
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
      const { size } = this;
      canvas.onmousemove = this.onmousemove.bind(this);
      canvas.onmouseup = () => {
        canvas.onmousemove = null;
      };
      const ctx = canvas.getContext('2d');
      const { canvasData } = this;
      if (event.which === 1) ctx.fillStyle = primaryColor;
      else if (event.which === 3) ctx.fillStyle = secondaryColor;
      const x = event.offsetX;
      const y = event.offsetY;

      for (let i = 0; i < canvasData.length; i += 1) {
        const xi = canvasData[i][0] + canvasData[i][2];
        const yi = canvasData[i][1] + canvasData[i][3];
        if ((x <= xi) && (y <= yi)) {
          // eslint-disable-next-line max-len
          ctx.fillRect(canvasData[i][0] - size, canvasData[i][1] - size, canvasData[i][2] + size, canvasData[i][3] + size);
          ctx.stroke();
          break;
        }
      }
    }

    function matchStartColor(pixelPos, startR, startG, startB, imgData) {
      const r = imgData.data[pixelPos];
      const g = imgData.data[pixelPos + 1];
      const b = imgData.data[pixelPos + 2];
      // let a = imgData.data[pixelPos + 3];

      // If current pixel of the outline image is black
      // if (matchOutlineColor(r, g, b, a)) {
      //   return false;
      // }

      // r = colorLayerData.data[pixelPos];
      // g = colorLayerData.data[pixelPos + 1];
      // b = colorLayerData.data[pixelPos + 2];

      // If the current pixel matches the clicked color
      if (r === startR && g === startG && b === startB) {
        return true;
      }

      // If current pixel matches the new color
      // if (r === curColor.r && g === curColor.g && b === curColor.b) {
      //   return false;
      // }

      return false;
    }

    function colorPixel(pixelPos, r, g, b, colorLayerData) {
      // eslint-disable-next-line no-param-reassign
      colorLayerData.data[pixelPos] = r;
      // eslint-disable-next-line no-param-reassign
      colorLayerData.data[pixelPos + 1] = g;
      // eslint-disable-next-line no-param-reassign
      colorLayerData.data[pixelPos + 2] = b;
      // eslint-disable-next-line no-param-reassign
      // colorLayerData.data[pixelPos + 3] = a !== undefined ? a : 255;
    }

    function hex2rgb(c) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : null;
    }

    function floodFill(strtX, strtY, startR, startG, startB, canvasWidth, outlineData, colorData) {
      const primaryColor = hex2rgb(document.querySelector('.color-conteiner__primary_item').value);
      const pixelStack = [[strtX, strtY]];
      let newPos;
      let x;
      let y;
      let reachLeft;
      let reachRight;

      while (pixelStack.length) {
        newPos = pixelStack.pop();
        // eslint-disable-next-line prefer-destructuring
        x = newPos[0];
        // eslint-disable-next-line prefer-destructuring
        y = newPos[1];

        let pixelPos = (y * canvasWidth + x) * 4;

        // Go up as long as the color matches and are inside the canvas
        while (y >= 0 && matchStartColor(pixelPos, startR, startG, startB, colorData)) {
          y -= 1;
          pixelPos -= canvasWidth * 4;
        }
        pixelPos += canvasWidth * 4;
        y += 1;
        reachLeft = false;
        reachRight = false;

        while (y <= 400 && matchStartColor(pixelPos, startR, startG, startB, colorData)) {
          y += 1;

          colorPixel(pixelPos, primaryColor.r, primaryColor.g, primaryColor.b, colorData);

          if (x > 0) {
            window.console.log(`x > 0${x}`);
            if (matchStartColor(pixelPos - 4, startR, startG, startB, colorData)) {
              if (!reachLeft) {
                //     // Add pixel to stack
                pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }
          if (x < 400) {
            window.console.log(`x < 400${x}`);
            if (matchStartColor(pixelPos + 4, startR, startG, startB, outlineData)) {
              if (!reachRight) {
                // Add pixel to stack
                pixelStack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }
          pixelPos += canvasWidth * 4;
        }
      }
    }

    if (toolPaintBucket.classList[1] === 'tools-conteiner__item_button-active') {
      const canvas = event.target.parentNode.children[0];
      // const primaryColor = this.form.querySelector('.color-conteiner__primary_item').value;
      // const secondaryColor = this.form.querySelector('.color-conteiner__secondary_item').value;

      const ctx = canvas.getContext('2d');
      const colorLayerData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
      const outlineLayerData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
      // window.console.log(imgData);
      // for (let i = 0; i < imgData.data.length; i += 4) {
      //   imgData.data[i] = 255 - imgData.data[i];
      //   imgData.data[i + 1] = 255 - imgData.data[i + 1];
      //   imgData.data[i + 2] = 255 - imgData.data[i + 2];
      //   imgData.data[i + 3] = 255;
      // }
      const startX = event.offsetX;
      const startY = event.offsetY;
      // window.console.log(startX, startY);

      const pixelPos = (startY * canvas.clientWidth + startX) * 4;
      const r = outlineLayerData.data[pixelPos];
      const g = outlineLayerData.data[pixelPos + 1];
      const b = outlineLayerData.data[pixelPos + 2];

      window.console.log(r, g, b);

      floodFill(startX, startY, r, g, b, canvas.clientWidth, outlineLayerData, colorLayerData);
      ctx.putImageData(colorLayerData, 0, 0);
    }
  }


  onmousemove(event) {
    const primaryColor = this.form.querySelector('.color-conteiner__primary_item').value;
    const secondaryColor = this.form.querySelector('.color-conteiner__secondary_item').value;
    const canvas = event.target.parentNode.children[0];
    const ctx = canvas.getContext('2d');
    const { canvasData } = this;
    if (event.which === 1) ctx.fillStyle = primaryColor;
    else if (event.which === 3) ctx.fillStyle = secondaryColor;
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
