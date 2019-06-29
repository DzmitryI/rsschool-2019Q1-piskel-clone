import './style.scss';
import FrameList from '../../components/frame-list/FrameList';

import backgroundCanvasImg from '../../assets/images/canvas-backgrounds/canvas-background-light.png';

export default class Preview {
  constructor() {
    this.form = document;
    this.timerId = null;
  }

  startAnimation() {
    const frameCur = this.form.getElementsByClassName('canvas-frame');
    if (frameCur.length > 0) {
      const prevCanv = document.querySelector('.preview-canvas');
      prevCanv.style.backgroundImage = `url(${backgroundCanvasImg})`;
      const prevW = prevCanv.width;
      const prevH = prevCanv.height;
      let count = 0;
      const timerId = setInterval(() => {
        const ctx = prevCanv.getContext('2d');
        ctx.clearRect(0, 0, prevW, prevH);
        const curEl = count % frameCur.length;
        const frameW = frameCur[curEl].width;
        const frameH = frameCur[curEl].height;
        ctx.drawImage(frameCur[curEl], 0, 0, frameW, frameH, 0, 0, prevW, prevH);
        count += 1;
      }, 1000 / Number(document.getElementById('sizeFPS').value));
      this.timerId = timerId;
    }
  }

  init() {
    const previewButton = this.form.querySelector('.preview-button');
    const sizeFPS = this.form.getElementById('sizeFPS');
    const buttonAddFrame = document.getElementById('addFrame');
    previewButton.addEventListener('click', this.previewButtonClick.bind(this));
    sizeFPS.addEventListener('mouseup', this.renameSizeFPS.bind(this));
    buttonAddFrame.addEventListener('mouseup', this.buttonAddFrameClick.bind(this));
    const previewCanvas = document.querySelector('.preview-canvas');
    previewCanvas.style.backgroundImage = `url(${backgroundCanvasImg})`;
  }

  renameSizeFPS() {
    const size = this.form.getElementById('sizeFPS').value;
    const controlfps = document.querySelector('.control-fps');
    controlfps.innerHTML = `${size} FPS`;
    clearInterval(this.timerId);
    if (size > 0) {
      this.startAnimation();
    }
  }

  previewButtonClick() {
    this.form.querySelector('.preview-canvas').requestFullscreen();
  }

  buttonAddFrameClick() {
    const frameList = new FrameList();
    const containerFrame = document.querySelector('.frame-container');
    [].map.call(containerFrame.children, item => item.classList.remove('container-current-frame-activ'));
    frameList.render();
    this.renameSizeFPS();
  }
}
