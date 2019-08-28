import './import.scss';

export default class Import {
  constructor() {
    this.form = document;
  }

  init() {
    const ImportButton = this.form.getElementById('import-button');
    ImportButton.addEventListener('change', this.change.bind(this));
  }

  change(event) {
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const file = event.target.files;

    const piskelNameHead = this.form.querySelector('.piskel-name');
    piskelNameHead.innerHTML = file[0].name.slice(0, file[0].name.indexOf('.'));
    const piskelName = this.form.querySelector('.save-field');
    piskelName.value = file[0].name.slice(0, file[0].name.indexOf('.'));

    const imgForCanvas = new Image();
    imgForCanvas.src = window.URL.createObjectURL(file[0]);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      imgForCanvas.onload = () => {
        // eslint-disable-next-line max-len
        ctx.drawImage(imgForCanvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        // eslint-disable-next-line max-len
        ctxFrame.drawImage(imgForCanvas, 0, 0, canvas.width, canvas.height, 0, 0, curElem.width, curElem.height);
      };
    }
  }
}
