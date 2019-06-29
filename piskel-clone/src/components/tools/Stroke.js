export default class Stroke {
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
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    canvas.onmouseup = this.onmouseopStroke.bind(this);
    // canvas.onmousemove = this.onmousemoveStroke.bind(this);
    // canvas.onmouseup = () => {
    // canvas.onmousemove = null;
    // };
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
  }

  onmouseopStroke(event) {
    const curX = event.offsetX;
    const curY = event.offsetY;

    const pixel = (x, y) => {
      const primaryColor = this.form.querySelector('.color-conteiner__primary_item').value;
      const secondaryColor = this.form.querySelector('.color-conteiner__secondary_item').value;
      const canvas = event.target.parentNode.children[0];
      const ctx = canvas.getContext('2d');
      let canvasData = [];
      if (this.currentResizeCanvas === 32) canvasData = this.canvasData32;
      else if (this.currentResizeCanvas === 64) canvasData = this.canvasData64;
      else if (this.currentResizeCanvas === 128) canvasData = this.canvasData128;
      if (event.which === 1) ctx.fillStyle = primaryColor;
      else if (event.which === 3) ctx.fillStyle = secondaryColor;
      const { sizePen } = this;
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
    };

    const drawLine = (x1, y1, x2, y2) => {
      let x;
      let y;
      let px;
      let py;
      let xe;
      let ye;
      let i;
      // Calculate line deltas
      const dx = x2 - x1;
      const dy = y2 - y1;
      // Create a positive copy of deltas (makes iterating easier)
      const dx1 = Math.abs(dx);
      const dy1 = Math.abs(dy);
      // Calculate error intervals for both axis
      px = 2 * dy1 - dx1;
      py = 2 * dx1 - dy1;
      // The line is X-axis dominant
      if (dy1 <= dx1) {
        // Line is drawn left to right
        if (dx >= 0) {
          x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap ends)
          x = x2; y = y2; xe = x1;
        }
        pixel(x, y); // Draw first pixel
        // Rasterize the line
        for (i = 0; x < xe; i += 1) {
          x += 1;
          // Deal with octants...
          if (px < 0) {
            px += 2 * dy1;
          } else {
            if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
              y += 1;
            } else {
              y -= 1;
            }
            px += 2 * (dy1 - dx1);
          }
          // Draw pixel from line span at currently rasterized position
          pixel(x, y);
        }
      } else { // The line is Y-axis dominant
        // Line is drawn bottom to top
        if (dy >= 0) {
          x = x1; y = y1; ye = y2;
        } else { // Line is drawn top to bottom
          x = x2; y = y2; ye = y1;
        }
        pixel(x, y); // Draw first pixel
        // Rasterize the line
        for (i = 0; y < ye; i += 1) {
          y += 1;
          // Deal with octants...
          if (py <= 0) {
            py += 2 * dx1;
          } else {
            if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
              x += 1;
            } else {
              x -= 1;
            }
            py += 2 * (dx1 - dy1);
          }
          // Draw pixel from line span at currently rasterized position
          pixel(x, y);
        }
      }
    };
    drawLine(this.startX, this.startY, curX, curY);
  }
}
