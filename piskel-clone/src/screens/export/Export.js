import './export.scss';

const FileSaver = require('file-saver');

export default class Export {
  constructor() {
    this.form = document;
  }

  init() {
    const exportButton = this.form.querySelector('.export-button');
    exportButton.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown() {
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    // const file = event.target.files;
    // const imgForCanvas = new Image();
    // imgForCanvas.src = window.URL.createObjectURL(file[0]);
    // const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // imgForCanvas.onload = () => {
    // eslint-disable-next-line max-len
    //   ctx.drawImage(imgForCanvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    // };
    // };
    canvas.toBlob((blob) => {
      FileSaver.saveAs(blob);
    });
  }
}
