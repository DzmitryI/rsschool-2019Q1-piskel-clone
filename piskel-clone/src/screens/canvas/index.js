import './index.scss';
import './settingsTip.scss';
import './otherTips.scss';

import penIcon from '../../assets/images/icons/tools/tool-pen.png';
import paintBacketIcon from '../../assets/images/icons/tools/tool-paint-bucket.png';
import eraserIcon from '../../assets/images/icons/tools/tool-eraser.png';
import strokeIcon from '../../assets/images/icons/tools/tool-stroke.png';
import colorPickerIcon from '../../assets/images/icons/tools/tool-colorpicker.png';

import backgroundCanvasImg from '../../assets/images/canvas-backgrounds/canvas-background-light.png';

import framePlusIcon from '../../assets/images/icons/frame/frame-plus.png';

import swapColrsIcon from '../../assets/images/icons/tools/swap_color.png';

import cheatsheetLinkIcon from '../../assets/images/icons/common/common-keyboard.png';

import settingResizeIcon from '../../assets/images/icons/settings/settings-resize.png';
import settingSeveIcon from '../../assets/images/icons/settings/settings-save.png';
import settingExportIcon from '../../assets/images/icons/settings/settings-export.png';
import settingImportIcon from '../../assets/images/icons/settings/settings-open-folder.png';

export default class Index {
  constructor() {
    this.form = document;
    this.canvData32 = [];
    this.canvData64 = [];
    this.canvData128 = [];
    this.sizePen = 0;
    this.currentResizeCanvas = 0;
    this.startX = 0;
    this.startY = 0;
  }

  start() {
    const penSize = this.form.querySelector('.pen-size-item1px');
    penSize.classList.add('tools-conteiner__item_button-active');
    const pen = this.form.getElementById('tool-pen-img');
    pen.src = penIcon;
    const paintBacket = this.form.getElementById('tool-paint-bucket-img');
    paintBacket.src = paintBacketIcon;
    const eraser = this.form.getElementById('tool-eraser-img');
    eraser.src = eraserIcon;
    const stroke = this.form.getElementById('tool-stroke-img');
    stroke.src = strokeIcon;
    const colorPicker = this.form.getElementById('tool-color-picker-img');
    colorPicker.src = colorPickerIcon;

    const backgroundCanvas = this.form.querySelector('.canvas-conteiner__canvas');
    backgroundCanvas.style.backgroundImage = `url(${backgroundCanvasImg})`;

    const framePlus = this.form.getElementById('frame-plus-img');
    framePlus.src = framePlusIcon;

    const resize = this.form.getElementById('setting-resize-img');
    resize.src = settingResizeIcon;
    const save = this.form.getElementById('setting-save-img');
    save.src = settingSeveIcon;
    const exportIcon = this.form.getElementById('setting-export-img');
    exportIcon.src = settingExportIcon;
    const importIcon = this.form.getElementById('setting-import-img');
    importIcon.src = settingImportIcon;

    const swapColors = this.form.getElementById('swap-colors');
    swapColors.src = swapColrsIcon;

    const cheatsheetLink = this.form.getElementById('cheatsheet-link-img');
    cheatsheetLink.src = cheatsheetLinkIcon;

    const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255,255,255,0)';
    const x32 = canvas.width / 32;
    const x64 = canvas.width / 64;
    const x128 = canvas.width / 128;
    const canvasData32 = [];
    const canvasData64 = [];
    const canvasData128 = [];
    for (let i = 0; i < 32; i += 1) {
      for (let j = 0; j < 32; j += 1) {
        canvasData32.push([j * x32, i * x32, x32, x32, j, i]);
      }
    }
    for (let i = 0; i < 64; i += 1) {
      for (let j = 0; j < 64; j += 1) {
        canvasData64.push([j * x64, i * x64, x64, x64, j, i]);
      }
    }
    for (let i = 0; i < 128; i += 1) {
      for (let j = 0; j < 128; j += 1) {
        canvasData128.push([j * x128, i * x128, x128, x128, j, i]);
      }
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.canvData32 = canvasData32;
    this.canvData64 = canvasData64;
    this.canvData128 = canvasData128;
  }
}
