import './index.scss';
import backgroundCanvasImg from '../../assets/images/canvas-backgrounds/canvas-background-light.png';

export default class FrameList {
  constructor() {
    this.form = document;
    this.countFrame = 0;
  }

  render() {
    const containerFrame = document.querySelector('.frame-container');
    const containerCurrentFrame = document.createElement('div');
    containerCurrentFrame.className = 'container-current-frame';
    const canvasFr = document.createElement('canvas');
    const buttonCanvasFrameDel = document.createElement('button');
    buttonCanvasFrameDel.className = 'button-frame button-canvas-frame-del';
    const buttonCloneFrame = document.createElement('button');
    buttonCloneFrame.className = 'button-frame button-clone-frame';
    const buttonCurrentNumber = document.createElement('input');
    buttonCurrentNumber.className = 'button-frame button-current-number';
    // this.countFrame += 1;
    buttonCurrentNumber.value = document.querySelectorAll('.button-current-number').length + 1;
    buttonCurrentNumber.disabled = true;
    const buttonMove = document.createElement('button');
    buttonMove.className = 'button-frame button-move';
    canvasFr.className = 'canvas-frame';
    canvasFr.width = '150';
    canvasFr.height = '150';
    canvasFr.style.backgroundImage = `url(${backgroundCanvasImg})`;

    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const addButton = this.form.querySelector('.frame-add-button');
    const ctx = canvasFr.getContext('2d');
    ctx.clearRect(0, 0, canvasFr.width, canvasFr.height);
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvasFr.width, canvasFr.height);
    containerCurrentFrame.appendChild(buttonCanvasFrameDel);
    containerCurrentFrame.appendChild(buttonCloneFrame);
    containerCurrentFrame.appendChild(buttonCurrentNumber);
    containerCurrentFrame.appendChild(buttonMove);
    containerCurrentFrame.appendChild(canvasFr);
    containerFrame.insertBefore(containerCurrentFrame, addButton);
    containerFrame.addEventListener('click', this.click.bind(this));
  }


  click(event) {
    const currentNumberFrame = () => {
      const frameCurrent = document.querySelectorAll('.button-current-number');
      for (let i = 0; i < frameCurrent.length; i += 1) {
        frameCurrent[i].value = i + 1;
      }
    };
    if (event.target.classList[1] === 'button-canvas-frame-del') {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
      this.countFrame -= 1;
      currentNumberFrame();
    }
    event.stopPropagation();
  }
}
