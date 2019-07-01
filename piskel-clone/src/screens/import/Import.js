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
    imgForCanvas.onload = () => {
      ctx.drawImage(imgForCanvas, 0, 0, 400, 400, 0, 0, canvas.width, canvas.height);
    };
  }
}
