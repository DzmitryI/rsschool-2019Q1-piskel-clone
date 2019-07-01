import './modalCheatsheet.scss';
import penIcon from '../../../assets/images/icons/tools/tool-pen.png';
import paintBacketIcon from '../../../assets/images/icons/tools/tool-paint-bucket.png';
import eraserIcon from '../../../assets/images/icons/tools/tool-eraser.png';
import strokeIcon from '../../../assets/images/icons/tools/tool-stroke.png';
import swapColorsIcon from '../../../assets/images/icons/tools/swap_color.png';

export default class ModelCheatsheer {
  constructor() {
    this.form = document;
  }

  init() {
    const pen = this.form.getElementById('tip-tool-pen-img');
    pen.src = penIcon;
    const paintBacket = this.form.getElementById('tip-tool-paint-bucket-img');
    paintBacket.src = paintBacketIcon;
    const eraser = this.form.getElementById('tip-tool-eraser-img');
    eraser.src = eraserIcon;
    const stroke = this.form.getElementById('tip-tool-stroke-img');
    stroke.src = strokeIcon;
    const swapColors = this.form.getElementById('tip-swap-colors-img');
    swapColors.src = swapColorsIcon;

    const cheatsheetLink = this.form.querySelector('.cheatsheet-link');
    cheatsheetLink.addEventListener('click', this.cheatsheetLinkClick.bind(this));
    const modal = this.form.querySelector('#modal');
    const modalOverlay = this.form.querySelector('#modal-overlay');
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
  }

  cheatsheetLinkClick() {
    const modal = this.form.querySelector('#modal');
    const modalOverlay = this.form.querySelector('#modal-overlay');
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
    modal.addEventListener('click', this.closeButtonClick.bind(this));
  }

  closeButtonClick(event) {
    const modal = this.form.querySelector('#modal');
    const modalOverlay = this.form.querySelector('#modal-overlay');
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
    event.stopImmediatePropagation();
  }
}
