import './style.scss';

import backgroundCanvasImg from '../../assets/images/canvas-backgrounds/canvas-background-light.png';

export default class Preview {
  constructor() {
    this.form = document;
    this.timerId = null;
  }

  startAnimation() {
    const frameCurrent = this.form.getElementsByClassName('canvas-frame');
    if (frameCurrent.length > 0) {
      let count = 0;
      const timerId = setInterval(() => {
        const previewCanvas = document.querySelector('.preview-canvas');
        previewCanvas.style.backgroundImage = `url(${backgroundCanvasImg})`;
        const ctx = previewCanvas.getContext('2d');
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        // eslint-disable-next-line max-len
        ctx.drawImage(frameCurrent[count % frameCurrent.length], 0, 0, frameCurrent[count % frameCurrent.length].width, frameCurrent[count % frameCurrent.length].height, 0, 0, previewCanvas.width, previewCanvas.height);
        count += 1;
        if (count === 50) {
          setTimeout(() => {
            clearInterval(timerId);
          }, 0);
        }
      }, 1000 / Number(document.getElementById('sizeFPS').value));
    }
  }

  init() {
    const previewButton = this.form.querySelector('.preview-button');
    const sizeFPS = this.form.getElementById('sizeFPS');
    previewButton.addEventListener('click', this.click.bind(this));
    sizeFPS.addEventListener('mouseup', this.renameSizeFPS.bind(this));
    this.startAnimation();
  }

  renameSizeFPS() {
    const size = this.form.getElementById('sizeFPS').value;
    const controlfps = document.querySelector('.control-fps');
    controlfps.innerHTML = `${size} FPS`;
    this.startAnimation();
  }

  click() {
    this.form.querySelector('.preview-canvas').requestFullscreen();
  }
}
