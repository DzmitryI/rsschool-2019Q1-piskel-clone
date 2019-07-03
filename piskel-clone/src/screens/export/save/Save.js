import './save.scss';

const FileSaver = require('file-saver');

export default class Save {
  constructor() {
    this.form = document;
  }

  init() {
    const saveButton = this.form.querySelector('.save-button');
    saveButton.addEventListener('mousedown', this.mouseDown.bind(this));
    const piskelName = this.form.querySelector('.save-field');
    const piskelNameHead = this.form.querySelector('.piskel-name');
    piskelName.value = 'piskel-name';
    piskelNameHead.innerHTML = piskelName.value;
  }

  mouseDown() {
    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const piskelName = this.form.querySelector('.save-field');
    let fileName = '';
    if (piskelName.value.length > 0) { fileName = `${piskelName.value}.piskel`; }

    canvas.toBlob((blob) => {
      FileSaver.saveAs(blob, fileName);
    });
  }
}
