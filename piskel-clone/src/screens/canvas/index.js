import './index.scss';
import penIcon from '../../assets/images/icons/tools/tool-pen.png';
import paintBacketIcon from '../../assets/images/icons/tools/tool-paint-bucket.png';
import eraserIcon from '../../assets/images/icons/tools/tool-eraser.png';
import strokeIcon from '../../assets/images/icons/tools/tool-stroke.png';

import backgroundCanvasImg from '../../assets/images/canvas-backgrounds/canvas-background-light.png';

import framePlusIcon from '../../assets/images/icons/frame/frame-plus.png';
import transformBacketIcon from '../../assets/images/icons/tools/transform.png';
import swapColrsIcon from '../../assets/images/icons/tools/swap_color.png';

import settingResizeIcon from '../../assets/images/icons/settings/settings-resize.png';
import settingSeveIcon from '../../assets/images/icons/settings/settings-save.png';
import settingExportIcon from '../../assets/images/icons/settings/settings-export.png';
import settingImportIcon from '../../assets/images/icons/settings/settings-open-folder.png';

export default class Index {
  constructor() {
    this.form = document;
    this.canvasData32 = [];
    this.canvasData64 = [];
    this.canvasData128 = [];
    this.sizePen = 0;
    this.currentResizeCanvas = 0;
    this.startX = 0;
    this.startY = 0;
  }

  start() {
    const penSize = this.form.querySelector('.pen-size-item1px');
    penSize.classList.add('tools-conteiner__item_button-active');
    const pen = this.form.getElementById('tool-pen-img');
    pen.src = penIcon;
    const paintBacket = this.form.getElementById('tool-paint-bucket-img');
    paintBacket.src = paintBacketIcon;
    const eraser = this.form.getElementById('tool-eraser-img');
    eraser.src = eraserIcon;
    const stroke = this.form.getElementById('tool-stroke-img');
    stroke.src = strokeIcon;

    const backgroundCanvas = this.form.querySelector('.canvas-conteiner__canvas');
    backgroundCanvas.style.backgroundImage = `url(${backgroundCanvasImg})`;

    const framePlus = this.form.getElementById('frame-plus-img');
    framePlus.src = framePlusIcon;

    const resize = this.form.getElementById('setting-resize-img');
    resize.src = settingResizeIcon;
    const save = this.form.getElementById('setting-save-img');
    save.src = settingSeveIcon;
    const exportIcon = this.form.getElementById('setting-export-img');
    exportIcon.src = settingExportIcon;
    const importIcon = this.form.getElementById('setting-import-img');
    importIcon.src = settingImportIcon;

    const transform = this.form.getElementById('transform');
    transform.src = transformBacketIcon;
    const swapColors = this.form.getElementById('swap-colors');
    swapColors.src = swapColrsIcon;

    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(100,150,185,0.1)';
    const x32 = canvas.width / 32;
    const x64 = canvas.width / 64;
    const x128 = canvas.width / 128;
    const canvasData32 = [];
    const canvasData64 = [];
    const canvasData128 = [];
    for (let i = 0; i < 32; i += 1) {
      for (let j = 0; j < 32; j += 1) {
        canvasData32.push([j * x32, i * x32, x32, x32, j, i]);
      }
    }
    for (let i = 0; i < 64; i += 1) {
      for (let j = 0; j < 64; j += 1) {
        canvasData64.push([j * x64, i * x64, x64, x64, j, i]);
      }
    }
    for (let i = 0; i < 128; i += 1) {
      for (let j = 0; j < 128; j += 1) {
        canvasData128.push([j * x128, i * x128, x128, x128, j, i]);
      }
    }
    ctx.fillRect(0, 0, 400, 400);
    this.canvasData32 = canvasData32;
    this.canvasData64 = canvasData64;
    this.canvasData128 = canvasData128;
    // canvas.addEventListener('mousedown', this.mouseDown.bind(this));
    // canvas.addEventListener('mousemove', this.mouseCoordinatesMove.bind(this));
    // canvas.addEventListener('mouseout', this.mouseCoordinatesOut.bind(this));
  }

  mouseDown(event) {
    const toolPen = document.querySelector('#tool-pen');
    const toolPaintBucket = document.querySelector('#tool-paint-bucket');
    const toolEraser = document.querySelector('#tool-eraser');
    // const toolStroke = document.querySelector('#tool-stroke');
    const canvas = event.target.parentNode.children[0];
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
    const { sizePen } = this;
    if ((toolPen.classList[1] === 'tools-conteiner__item_button-active')
      || (toolEraser.classList[1] === 'tools-conteiner__item_button-active')) {
      const primaryColor = this.form.querySelector('.color-conteiner__primary_item').value;
      const secondaryColor = this.form.querySelector('.color-conteiner__secondary_item').value;
      canvas.onmousemove = this.onmousemove.bind(this);
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

      const ctx = canvas.getContext('2d');
      let canvasData = [];
      if (this.currentResizeCanvas === 32) canvasData = this.canvasData32;
      else if (this.currentResizeCanvas === 64) canvasData = this.canvasData64;
      else if (this.currentResizeCanvas === 128) canvasData = this.canvasData128;
      if (event.which === 1) ctx.fillStyle = primaryColor;
      else if (event.which === 3) ctx.fillStyle = secondaryColor;
      if (toolEraser.classList[1] === 'tools-conteiner__item_button-active') {
        ctx.globalCompositeOperation = 'destination-out';
      } else ctx.globalCompositeOperation = 'source-over';
      const x = event.offsetX;
      const y = event.offsetY;

      for (let i = 0; i < canvasData.length; i += 1) {
        const xi = canvasData[i][0] + canvasData[i][2];
        const yi = canvasData[i][1] + canvasData[i][3];
        if ((x <= xi) && (y <= yi)) {
          // eslint-disable-next-line max-len
          ctx.clearRect(canvasData[i][0] - sizePen, canvasData[i][1] - sizePen, canvasData[i][2] + sizePen, canvasData[i][3] + sizePen);
          // eslint-disable-next-line max-len
          ctx.fillRect(canvasData[i][0] - sizePen, canvasData[i][1] - sizePen, canvasData[i][2] + sizePen + 1, canvasData[i][3] + sizePen + 1);
          break;
        }
      }
    }

    function matchStartColor(pixelPos, startR, startG, startB, imgData) {
      const r = imgData.data[pixelPos];
      const g = imgData.data[pixelPos + 1];
      const b = imgData.data[pixelPos + 2];
      if (r === startR && g === startG && b === startB) {
        return true;
      }
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
      colorLayerData.data[pixelPos + 3] = 255;
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
            if (matchStartColor(pixelPos - 4, startR, startG, startB, colorData)) {
              if (!reachLeft) {
                pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }
          if (x < 400) {
            if (matchStartColor(pixelPos + 4, startR, startG, startB, outlineData)) {
              if (!reachRight) {
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
      // const canvas = event.target.parentNode.children[0];
      const primaryColor = hex2rgb(document.querySelector('.color-conteiner__primary_item').value);
      const ctx = canvas.getContext('2d');
      const colorLayerData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
      const outlineLayerData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
      const startX = event.offsetX;
      const startY = event.offsetY;
      const pixelPos = (startY * canvas.clientWidth + startX) * 4;
      const r = outlineLayerData.data[pixelPos];
      const g = outlineLayerData.data[pixelPos + 1];
      const b = outlineLayerData.data[pixelPos + 2];

      window.console.log(r, g, b);
      if ((r !== primaryColor.r || g !== primaryColor.g || b !== primaryColor.b)) {
        floodFill(startX, startY, r, g, b, canvas.clientWidth, outlineLayerData, colorLayerData);
      }
      ctx.putImageData(colorLayerData, 0, 0);
    }

    // if (toolStroke.classList[1] === 'tools-conteiner__item_button-active') {
    //   canvas.onmouseup = this.onmousemoveStroke.bind(this);
    // }
  }

  // onmousemoveStroke(event) {
  //   const curX = event.offsetX;
  //   const curY = event.offsetY;
  //   // console.log(this.startX, this.startY);

  //   const pixel = (x, y) => {
  //     // console.log(x, y);
  //     const primaryColor = this.form.querySelector('.color-conteiner__primary_item').value;
  //     const secondaryColor = this.form.querySelector('.color-conteiner__secondary_item').value;
  //     const canvas = event.target.parentNode.children[0];
  //     const ctx = canvas.getContext('2d');
  //     let canvasData = [];
  //     if (this.currentResizeCanvas === 32) canvasData = this.canvasData32;
  //     else if (this.currentResizeCanvas === 64) canvasData = this.canvasData64;
  //     else if (this.currentResizeCanvas === 128) canvasData = this.canvasData128;
  //     if (event.which === 1) ctx.fillStyle = primaryColor;
  //     else if (event.which === 3) ctx.fillStyle = secondaryColor;
  //     const { sizePen } = this;
  //     for (let i = 0; i < canvasData.length; i += 1) {
  //       const xi = canvasData[i][0] + canvasData[i][2];
  //       const yi = canvasData[i][1] + canvasData[i][3];
  //       if ((x <= xi) && (y <= yi)) {
  // eslint-disable-next-line max-len
  //         ctx.clearRect(canvasData[i][0] - sizePen, canvasData[i][1] - sizePen, canvasData[i][2] + sizePen, canvasData[i][3] + sizePen);
  // eslint-disable-next-line max-len
  //         ctx.fillRect(canvasData[i][0] - sizePen, canvasData[i][1] - sizePen, canvasData[i][2] + sizePen + 1, canvasData[i][3] + sizePen + 1);
  //         break;
  //       }
  //     }
  //   };

  //   const drawLine = (x1, y1, x2, y2) => {
  //     let x;
  //     let y;
  //     // let dx;
  //     // let dy;
  //     // let dx1;
  //     // let dy1;
  //     let px;
  //     let py;
  //     let xe;
  //     let ye;
  //     let i;

  //     // Calculate line deltas
  //     const dx = x2 - x1;
  //     const dy = y2 - y1;

  //     // Create a positive copy of deltas (makes iterating easier)
  //     const dx1 = Math.abs(dx);
  //     const dy1 = Math.abs(dy);

  //     // Calculate error intervals for both axis
  //     px = 2 * dy1 - dx1;
  //     py = 2 * dx1 - dy1;

  //     // The line is X-axis dominant
  //     if (dy1 <= dx1) {
  //       // Line is drawn left to right
  //       if (dx >= 0) {
  //         x = x1; y = y1; xe = x2;
  //       } else { // Line is drawn right to left (swap ends)
  //         x = x2; y = y2; xe = x1;
  //       }

  //       pixel(x, y); // Draw first pixel

  //       // Rasterize the line
  //       for (i = 0; x < xe; i += 1) {
  //         x += 1;

  //         // Deal with octants...
  //         if (px < 0) {
  //           px += 2 * dy1;
  //         } else {
  //           if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
  //             y += 1;
  //           } else {
  //             y -= 1;
  //           }
  //           px += 2 * (dy1 - dx1);
  //         }

  //         // Draw pixel from line span at currently rasterized position
  //         pixel(x, y);
  //       }
  //     } else { // The line is Y-axis dominant
  //       // Line is drawn bottom to top
  //       if (dy >= 0) {
  //         x = x1; y = y1; ye = y2;
  //       } else { // Line is drawn top to bottom
  //         x = x2; y = y2; ye = y1;
  //       }

  //       pixel(x, y); // Draw first pixel

  //       // Rasterize the line
  //       for (i = 0; y < ye; i += 1) {
  //         y += 1;

  //         // Deal with octants...
  //         if (py <= 0) {
  //           py += 2 * dx1;
  //         } else {
  //           if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
  //             x += 1;
  //           } else {
  //             x -= 1;
  //           }
  //           py += 2 * (dx1 - dy1);
  //         }

  //         // Draw pixel from line span at currently rasterized position
  //         pixel(x, y);
  //       }
  //     }
  //   };
  //   drawLine(this.startX, this.startY, curX, curY);
  // }

  onmousemove(event) {
    const primaryColor = this.form.querySelector('.color-conteiner__primary_item').value;
    const secondaryColor = this.form.querySelector('.color-conteiner__secondary_item').value;
    const canvas = event.target.parentNode.children[0];
    const ctx = canvas.getContext('2d');
    const resizeArr = this.form.getElementsByName('resize');
    const currentResize = +[].filter.call(resizeArr, item => item.checked)[0].value;
    let canvData = [];
    if (currentResize === 32) canvData = this.canvasData32;
    else if (currentResize === 64) canvData = this.canvasData64;
    else if (currentResize === 128) canvData = this.canvasData128;
    if (event.which === 1) ctx.fillStyle = primaryColor;
    else if (event.which === 3) ctx.fillStyle = secondaryColor;
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x, y);
    for (let i = 0; i < canvData.length; i += 1) {
      const xi = canvData[i][0] + canvData[i][2];
      const yi = canvData[i][1] + canvData[i][3];
      const { size } = this;
      if ((x <= xi) && (y <= yi)) {
        // eslint-disable-next-line max-len
        ctx.clearRect(canvData[i][0] - size, canvData[i][1] - size, canvData[i][2] + size, canvData[i][3] + size);
        // eslint-disable-next-line max-len
        ctx.fillRect(canvData[i][0] - size, canvData[i][1] - size, canvData[i][2] + size + 1, canvData[i][3] + size + 1);
        break;
      }
    }
  }

  // mouseCoordinatesMove(event) {
  //   const resizeArr = this.form.getElementsByName('resize');
  //   const cursorCoordinates = this.form.querySelector('.cursor-coordinates');
  //   const currentResize = +[].filter.call(resizeArr, item => item.checked)[0].value;
  //   let canvasData = [];
  //   if (currentResize === 32) canvasData = this.canvasData32;
  //   else if (currentResize === 64) canvasData = this.canvasData64;
  //   else if (currentResize === 128) canvasData = this.canvasData128;
  //   const x = event.offsetX;
  //   const y = event.offsetY;
  //   for (let i = 0; i < canvasData.length; i += 1) {
  //     const xi = canvasData[i][0] + canvasData[i][2];
  //     const yi = canvasData[i][1] + canvasData[i][3];
  //     if ((x <= xi) && (y <= yi)) {
  // eslint-disable-next-line max-len
  //       cursorCoordinates.innerHTML = `[ ${currentResize}x${currentResize} ] ${canvasData[i][4]} : ${canvasData[i][5]}`;
  //       break;
  //     }
  //   }
  // }

  // mouseCoordinatesOut() {
  //   const resizeArr = this.form.getElementsByName('resize');
  //   const cursorCoordinates = this.form.querySelector('.cursor-coordinates');
  //   const currentResize = +[].filter.call(resizeArr, item => item.checked)[0].value;
  //   cursorCoordinates.innerHTML = `[ ${currentResize}x${currentResize} ]`;
  // }
}
