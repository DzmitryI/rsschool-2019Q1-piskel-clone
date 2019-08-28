export default class Stroke {
  constructor(canvasData32, canvasData64, canvasData128) {
    this.form = document;
    this.canvasData32 = canvasData32;
    this.canvasData64 = canvasData64;
    this.canvasData128 = canvasData128;
  }

  init() {
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    canvas.addEventListener('mousemove', this.mouseCoordinatesMove(this));
    canvas.addEventListener('mouseout', this.mouseCoordinatesOut.bind(this));
  }

  mouseCoordinatesMove() {
    return (event) => {
      const resizeArr = this.form.getElementsByName('resize');
      const cursorCoordinates = this.form.querySelector('.cursor-coordinates');
      const currentResize = +[].filter.call(resizeArr, item => item.checked)[0].value;
      let canvasData = [];
      if (currentResize === 32) canvasData = this.canvasData32;
      else if (currentResize === 64) canvasData = this.canvasData64;
      else if (currentResize === 128) canvasData = this.canvasData128;
      const x = event.offsetX;
      const y = event.offsetY;
      for (let i = 0; i < canvasData.length; i += 1) {
        const xi = canvasData[i][0] + canvasData[i][2];
        const yi = canvasData[i][1] + canvasData[i][3];
        if ((x <= xi) && (y <= yi)) {
          cursorCoordinates.innerHTML = `[ ${currentResize}x${currentResize} ] ${canvasData[i][4]} : ${canvasData[i][5]}`;
          break;
        }
      }
    };
  }

  mouseCoordinatesOut() {
    const resizeArr = this.form.getElementsByName('resize');
    const cursorCoordinates = this.form.querySelector('.cursor-coordinates');
    const currentResize = +[].filter.call(resizeArr, item => item.checked)[0].value;
    cursorCoordinates.innerHTML = `[ ${currentResize}x${currentResize} ]`;
  }
}
