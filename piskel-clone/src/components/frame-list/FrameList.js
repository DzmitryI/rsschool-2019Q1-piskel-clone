import './frameList.scss';

import backgroundCanvasImg from '../../assets/images/canvas-backgrounds/canvas-background-light.png';

export default class FrameList {
  constructor() {
    this.form = document;
    this.dragSrcEl = null;
  }

  render() {
    const containerFrame = document.querySelector('.frame-container');
    const containerCurrentFrame = document.createElement('div');
    containerCurrentFrame.className = 'container-current-frame draggable';
    const canvasFr = document.createElement('canvas');
    const buttonCanvasFrameDel = document.createElement('button');
    buttonCanvasFrameDel.className = 'button-frame button-del-frame';
    const buttonCloneFrame = document.createElement('button');
    buttonCloneFrame.className = 'button-frame button-clone-frame';
    const buttonCurrentNumber = document.createElement('input');
    buttonCurrentNumber.className = 'button-frame button-current-number-frame';
    buttonCurrentNumber.value = document.querySelectorAll('.button-current-number-frame').length + 1;
    buttonCurrentNumber.disabled = true;
    const buttonMove = document.createElement('button');
    buttonMove.className = 'button-frame button-move-frame';
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
    containerFrame.addEventListener('mousedown', this.mouseDown.bind(this));

    const cols = document.querySelectorAll('.draggable');
    [].forEach.call(cols, (col) => {
      col.addEventListener('dragstart', this.handleDragStart.bind(this));
      col.addEventListener('dragenter', this.handleDragEnter.bind(this));
      col.addEventListener('dragover', this.handleDragOver.bind(this));
      col.addEventListener('dragleave', this.handleDragLeave.bind(this));
      col.addEventListener('drop', this.handleDrop.bind(this));
      col.addEventListener('dragend', this.handleDragEnd.bind(this));
    });
  }

  mouseDown(event) {
    const currentNumberFrame = () => {
      const frameCurrent = this.form.querySelectorAll('.button-current-number-frame');
      for (let i = 0; i < frameCurrent.length; i += 1) {
        frameCurrent[i].value = i + 1;
      }
    };
    if (event.target.classList[1] === 'button-del-frame') {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
      currentNumberFrame();
    } else if (event.target.classList[1] === 'button-clone-frame') {
      const { nextSibling } = event.target.parentNode;
      const cloneCanv = event.target.parentNode.children[4];
      const newCloneFrame = event.target.parentNode.cloneNode(true);
      const newCloneCanv = newCloneFrame.children[4];
      const ctx = newCloneCanv.getContext('2d');
      // eslint-disable-next-line max-len
      ctx.drawImage(cloneCanv, 0, 0, cloneCanv.width, cloneCanv.height, 0, 0, newCloneCanv.width, newCloneCanv.height);
      event.target.parentNode.parentNode.insertBefore(newCloneFrame, nextSibling);
      currentNumberFrame();

      const cols = document.querySelectorAll('.container-current-frame');
      [].forEach.call(cols, (col) => {
        col.addEventListener('dragstart', this.handleDragStart.bind(this));
        col.addEventListener('dragenter', this.handleDragEnter.bind(this));
        col.addEventListener('dragover', this.handleDragOver.bind(this));
        col.addEventListener('dragleave', this.handleDragLeave.bind(this));
        col.addEventListener('drop', this.handleDrop.bind(this));
        col.addEventListener('dragend', this.handleDragEnd.bind(this));
      });
    } else if (event.target.classList[0] === 'canvas-frame') {
      if (![].some.call(event.target.parentNode.classList, item => item === 'container-current-frame-activ')) {
        [].map.call(event.target.parentNode.parentNode.children, item => item.classList.remove('container-current-frame-activ'));
        event.target.parentNode.classList.add('container-current-frame-activ');
        const canvas = this.form.querySelector('.canvas-conteiner__canvas');
        const ctx = canvas.getContext('2d');
        const canvFr = event.target;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(canvFr, 0, 0, canvFr.width, canvFr.height, 0, 0, canvas.width, canvas.height);
      }
    }
    event.stopImmediatePropagation();
  }

  handleDragStart(event) {
    this.dragSrcEl = event.target.parentNode;
    // eslint-disable-next-line no-param-reassign
    event.target.parentNode.style.opacity = 0.5;
  }

  handleDragEnter() {
    this.dragSrcEl.classList.add('over');
  }

  // eslint-disable-next-line class-methods-use-this
  handleDragOver(event) {
    event.preventDefault();
  }

  handleDragLeave() {
    this.dragSrcEl.classList.remove('over');
  }

  handleDrop(event) {
    const containerFrame = document.querySelector('.frame-container');
    event.stopImmediatePropagation();
    if (this.dragSrcEl !== event.target.parentNode) {
      let curring = event.target.parentNode.nextElementSibling;
      if (curring === this.dragSrcEl) curring = event.target.parentNode;
      const ren = containerFrame.replaceChild(event.target.parentNode, this.dragSrcEl);
      containerFrame.insertBefore(ren, curring);
    }
  }

  handleDragEnd(event) {
    // eslint-disable-next-line no-param-reassign
    event.target.parentNode.style.opacity = '';
    const cols = this.form.querySelectorAll('.draggable');
    [].forEach.call(cols, (col) => {
      col.classList.remove('over');
    });
  }
}
