export default class PaintBucket {
  constructor(canvasData32, canvasData64, canvasData128, startX, startY) {
    this.form = document;
    this.canvasData32 = canvasData32;
    this.canvasData64 = canvasData64;
    this.canvasData128 = canvasData128;
    this.sizePen = 0;
    this.currentResizeCanvas = 0;
    this.startX = startX;
    this.startY = startY;
  }

  start() {
    const matchStartColor = (pixelPos, startR, startG, startB, imgData) => {
      const r = imgData.data[pixelPos];
      const g = imgData.data[pixelPos + 1];
      const b = imgData.data[pixelPos + 2];
      if (r === startR && g === startG && b === startB) {
        return true;
      }
      return false;
    };
    const colorPixel = (pixelPos, r, g, b, colorLayerData) => {
      // eslint-disable-next-line no-param-reassign
      colorLayerData.data[pixelPos] = r;
      // eslint-disable-next-line no-param-reassign
      colorLayerData.data[pixelPos + 1] = g;
      // eslint-disable-next-line no-param-reassign
      colorLayerData.data[pixelPos + 2] = b;
      // eslint-disable-next-line no-param-reassign
      colorLayerData.data[pixelPos + 3] = 255;
    };
    const hex2rgb = (c) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : null;
    };
    const floodFill = (strtX, strtY, startR, startG, startB, canvWdth, outlineData, colorData) => {
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

        let pixelPos = (y * canvWdth + x) * 4;

        while (y >= 0 && matchStartColor(pixelPos, startR, startG, startB, colorData)) {
          y -= 1;
          pixelPos -= canvWdth * 4;
        }
        pixelPos += canvWdth * 4;
        y += 1;
        reachLeft = false;
        reachRight = false;

        while (y <= 600 && matchStartColor(pixelPos, startR, startG, startB, colorData)) {
          y += 1;

          colorPixel(pixelPos, primaryColor.r, primaryColor.g, primaryColor.b, colorData);

          if (x > 0) {
            if (matchStartColor(pixelPos - 4, startR, startG, startB, colorData)) {
              if (!reachLeft) {
                pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }
          if (x < 600) {
            if (matchStartColor(pixelPos + 4, startR, startG, startB, outlineData)) {
              if (!reachRight) {
                pixelStack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }
          pixelPos += canvWdth * 4;
        }
      }
    };
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const primaryColor = hex2rgb(document.querySelector('.color-conteiner__primary_item').value);
    const ctx = canvas.getContext('2d');
    const colorLayerData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const outlineLayerData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const { startX } = this;
    const { startY } = this;
    const pixelPos = (startY * canvas.clientWidth + startX) * 4;
    const r = outlineLayerData.data[pixelPos];
    const g = outlineLayerData.data[pixelPos + 1];
    const b = outlineLayerData.data[pixelPos + 2];

    if ((r !== primaryColor.r || g !== primaryColor.g || b !== primaryColor.b)) {
      floodFill(startX, startY, r, g, b, canvas.clientWidth, outlineLayerData, colorLayerData);
    }
    ctx.putImageData(colorLayerData, 0, 0);

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
        const ctxFrame = curElem.getContext('2d');
        ctxFrame.clearRect(0, 0, curElem.width, curElem.height);
        // eslint-disable-next-line max-len
        ctxFrame.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, curElem.width, curElem.height);
      }
      canvas.onmousemove = null;
    };
  }
}
