import Index from './screens/canvas/index';
import Preview from './screens/preview/Preview';
import FrameList from './components/frame-list/FrameList';
import Resize from './components/model-dialog/Resize/Resize';
import Save from './screens/export/save/Save';
import Import from './screens/import/Import';
import Export from './screens/export/Export';

import Pen from './components/tools/Pen';
import Stroke from './components/tools/Stroke';
import Eraser from './components/tools/Eraser';
import PaintBucket from './components/tools/PaintBucket';
import ColorPicker from './components/tools/ColorPicker';
import Lighten from './components/tools/Lighten';


import eraserCursorIcon from './assets/images/cursors/eraser.png';
import strokeCursorIcon from './assets/images/cursors/stroke.png';
import penCursorIcon from './assets/images/cursors/pen.png';
import paintBucketCursorIcon from './assets/images/cursors/paint-bucket.png';
import colorPickerCursorIcon from './assets/images/cursors/colorPicker.png';
import lightenCursorIcon from './assets/images/cursors/lighten.png';

import MouseCoordinatesMove from './components/model-dialog/mouseCoordinatesMove';

import LandingPage from './components/model-dialog/landing/Landing';
import ModelCheatsheer from './components/model-dialog/modelCheatsheet/ModelCheatsheet';

const penSizeConteiner = document.querySelector('.pen-size-conteiner');
const toolsConteiner = document.querySelector('.tools-conteiner');
const settingsConteiner = document.querySelector('.settings-conteiner__list');
const canvas = document.querySelector('.canvas-conteiner__canvas');
const main = document.querySelector('.main');
const swapColors = document.querySelector('#swap-colors');
const buttonAddFrame = document.getElementById('addFrame');

const state = {
  correntTool: '',
  correntPenSize: '',
  correntSettingTool: '',
};

const app = new Index();
app.start();
const { canvData32 } = app;
const { canvData64 } = app;
const { canvData128 } = app;

const resize = new Resize();
resize.init();

const mouseCoordinatesMove = new MouseCoordinatesMove(canvData32, canvData64, canvData128);
mouseCoordinatesMove.init();

const landingPage = new LandingPage();
landingPage.init();

const modelCheatsheer = new ModelCheatsheer();
modelCheatsheer.init();

const save = new Save();
save.init();

const importF = new Import();
importF.init();

const exportF = new Export();
exportF.init();

const frameList = new FrameList();
frameList.render();

const preview = new Preview();
preview.init();

penSizeConteiner.addEventListener('click', (event) => {
  const arrSize = event.target.parentNode.children;
  if (event.target.classList[1] === 'pen-size-item1px') {
    if (state.correntPenSize === 'pen-size-item1px') {
      event.target.classList.remove('tools-conteiner__item_button-active');
      state.correntPenSize = '';
    } else {
      state.correntPenSize = 'pen-size-item1px';
      [].map.call(arrSize, item => item.classList.remove('tools-conteiner__item_button-active'));
      event.target.classList.add('tools-conteiner__item_button-active');
    }
    localStorage.setItem('correntPenSize', state.correntPenSize);
  } else if (event.target.classList[1] === 'pen-size-item2px') {
    if (state.correntPenSize === 'pen-size-item2px') {
      event.target.classList.remove('tools-conteiner__item_button-active');
      state.correntPenSize = '';
    } else {
      [].map.call(arrSize, item => item.classList.remove('tools-conteiner__item_button-active'));
      state.correntPenSize = 'pen-size-item2px';
      event.target.classList.add('tools-conteiner__item_button-active');
    }
    localStorage.setItem('correntPenSize', state.correntPenSize);
  } else if (event.target.classList[1] === 'pen-size-item3px') {
    if (state.correntPenSize === 'pen-size-item3px') {
      event.target.classList.remove('tools-conteiner__item_button-active');
      state.correntPenSize = '';
    } else {
      [].map.call(arrSize, item => item.classList.remove('tools-conteiner__item_button-active'));
      state.correntPenSize = 'pen-size-item3px';
      event.target.classList.add('tools-conteiner__item_button-active');
    }
    localStorage.setItem('correntPenSize', state.correntPenSize);
  } else if (event.target.classList[1] === 'pen-size-item4px') {
    if (state.correntPenSize === 'pen-size-item4px') {
      event.target.classList.remove('tools-conteiner__item_button-active');
      state.correntPenSize = '';
    } else {
      [].map.call(arrSize, item => item.classList.remove('tools-conteiner__item_button-active'));
      state.correntPenSize = 'pen-size-item4px';
      event.target.classList.add('tools-conteiner__item_button-active');
    }
    localStorage.setItem('correntPenSize', state.correntPenSize);
  }
});

toolsConteiner.addEventListener('click', (event) => {
  const arrSize = event.target.parentNode.parentNode.parentNode.children;
  document.body.children[1].style.cursor = 'default';
  if (event.target.parentNode.id === 'tool-pen') {
    if (state.correntTool === 'toolPen') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
      canvas.style.cursor = 'default';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolPen';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${penCursorIcon}), auto`;
    }
    localStorage.setItem('correntTool', state.correntTool);
  } else if (event.target.parentNode.id === 'tool-paint-bucket') {
    if (state.correntTool === 'toolPaintBucket') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
      canvas.style.cursor = 'default';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolPaintBucket';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${paintBucketCursorIcon}), auto`;
    }
    localStorage.setItem('correntTool', state.correntTool);
  } else if (event.target.parentNode.id === 'tool-eraser') {
    if (state.correntTool === 'toolEraser') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
      canvas.style.cursor = 'default';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolEraser';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${eraserCursorIcon}), auto`;
    }
    localStorage.setItem('correntTool', state.correntTool);
  } else if (event.target.parentNode.id === 'tool-stroke') {
    if (state.correntTool === 'toolStroke') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
      canvas.style.cursor = 'default';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolStroke';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${strokeCursorIcon}), auto`;
    }
    localStorage.setItem('correntTool', state.correntTool);
  } else if (event.target.parentNode.id === 'tool-color-picker') {
    if (state.correntTool === 'toolColorPicker') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
      document.body.children[1].style.cursor = 'default';
      canvas.style.cursor = 'default';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolColorPicker';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
      document.body.children[1].style.cursor = `url(${colorPickerCursorIcon}), auto`;
      canvas.style.cursor = `url(${colorPickerCursorIcon}), auto`;
    }
    localStorage.setItem('correntTool', state.correntTool);
  } else if (event.target.parentNode.id === 'tool-lighten') {
    if (state.correntTool === 'toolLighten') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
      canvas.style.cursor = 'default';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolLighten';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${lightenCursorIcon}), auto`;
    }
    localStorage.setItem('correntTool', state.correntTool);
  }
});

document.addEventListener('keypress', (event) => {
  const arrSize = toolsConteiner.children[0].children;
  document.body.children[1].style.cursor = 'default';
  switch (event.key) {
    case 'p':
      if (state.correntTool === 'toolPen') {
        arrSize[0].children[0].classList.remove('tools-conteiner__item_button-active');
        state.correntTool = '';
        canvas.style.cursor = 'default';
      } else {
        for (let i = 0; i < arrSize.length; i += 1) {
          arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
        }
        state.correntTool = 'toolPen';
        arrSize[0].children[0].classList.add('tools-conteiner__item_button-active');
        canvas.style.cursor = `url(${penCursorIcon}), auto`;
      }
      localStorage.setItem('correntTool', state.correntTool);
      break;
    case 'b':
      if (state.correntTool === 'toolPaintBucket') {
        arrSize[1].children[0].classList.remove('tools-conteiner__item_button-active');
        state.correntTool = '';
        canvas.style.cursor = 'default';
      } else {
        for (let i = 0; i < arrSize.length; i += 1) {
          arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
        }
        state.correntTool = 'toolPaintBucket';
        arrSize[1].children[0].classList.add('tools-conteiner__item_button-active');
        canvas.style.cursor = `url(${paintBucketCursorIcon}), auto`;
      }
      localStorage.setItem('correntTool', state.correntTool);
      break;
    case 'e':
      if (state.correntTool === 'toolEraser') {
        arrSize[2].children[0].classList.remove('tools-conteiner__item_button-active');
        state.correntTool = '';
        canvas.style.cursor = 'default';
      } else {
        for (let i = 0; i < arrSize.length; i += 1) {
          arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
        }
        state.correntTool = 'toolEraser';
        arrSize[2].children[0].classList.add('tools-conteiner__item_button-active');
        canvas.style.cursor = `url(${eraserCursorIcon}), auto`;
      }
      localStorage.setItem('correntTool', state.correntTool);
      break;
    case 's':
      if (state.correntTool === 'toolStroke') {
        arrSize[3].children[0].classList.remove('tools-conteiner__item_button-active');
        state.correntTool = '';
        canvas.style.cursor = 'default';
      } else {
        for (let i = 0; i < arrSize.length; i += 1) {
          arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
        }
        state.correntTool = 'toolStroke';
        arrSize[3].children[0].classList.add('tools-conteiner__item_button-active');
        canvas.style.cursor = `url(${strokeCursorIcon}), auto`;
      }
      localStorage.setItem('correntTool', state.correntTool);
      break;
    case 'o':
      if (state.correntTool === 'toolColorPicker') {
        arrSize[4].children[0].classList.remove('tools-conteiner__item_button-active');
        state.correntTool = '';
        document.body.children[1].style.cursor = 'default';
        canvas.style.cursor = 'default';
      } else {
        for (let i = 0; i < arrSize.length; i += 1) {
          arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
        }
        state.correntTool = 'toolColorPicker';
        arrSize[4].children[0].classList.add('tools-conteiner__item_button-active');
        document.body.children[1].style.cursor = `url(${colorPickerCursorIcon}), auto`;
        canvas.style.cursor = `url(${colorPickerCursorIcon}), auto`;
      }
      localStorage.setItem('correntTool', state.correntTool);
      break;
    case 'u':
      if (state.correntTool === 'toolLighten') {
        arrSize[5].children[0].classList.remove('tools-conteiner__item_button-active');
        state.correntTool = '';
        canvas.style.cursor = 'default';
      } else {
        for (let i = 0; i < arrSize.length; i += 1) {
          arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
        }
        state.correntTool = 'toolLighten';
        arrSize[5].children[0].classList.add('tools-conteiner__item_button-active');
        canvas.style.cursor = `url(${lightenCursorIcon}), auto`;
      }
      localStorage.setItem('correntTool', state.correntTool);
      break;
    case 'x': {
      const primaryColor = document.querySelector('.color-conteiner__primary_item').value;
      document.querySelector('.color-conteiner__primary_item').value = document.querySelector('.color-conteiner__secondary_item').value;
      document.querySelector('.color-conteiner__secondary_item').value = primaryColor;
      localStorage.setItem('primaryColor', document.querySelector('.color-conteiner__primary_item').value);
      localStorage.setItem('secondaryColor', document.querySelector('.color-conteiner__secondary_item').value);
      break;
    }
    default:
      break;
  }
});

settingsConteiner.addEventListener('click', (event) => {
  const arrSetting = document.querySelector('.settings-conteiner__list');
  const settingResizeConteiner = document.querySelector('.setting-resize-conteiner');
  const settingSaveConteiner = document.querySelector('.save-canvas-conteiner');
  const settingExportConteiner = document.querySelector('.export-canvas-conteiner');
  const settingImportConteiner = document.querySelector('.import-canvas-conteiner');
  if (event.target.parentNode.id === 'setting-resize') {
    if (state.correntSettingTool === 'settingResize') {
      event.target.parentNode.classList.remove('settings-conteiner__item_button-active');
      state.correntSettingTool = '';
      settingResizeConteiner.style.display = 'none';
    } else {
      for (let i = 0; i < arrSetting.children.length; i += 1) {
        arrSetting.children[i].children[0].classList.remove('settings-conteiner__item_button-active');
      }
      settingSaveConteiner.style.display = 'none';
      settingImportConteiner.style.display = 'none';
      settingExportConteiner.style.display = 'none';
      state.correntSettingTool = 'settingResize';
      event.target.parentNode.classList.add('settings-conteiner__item_button-active');
      settingResizeConteiner.style.display = 'block';
    }
    localStorage.setItem('correntSettingTool', state.correntSettingTool);
  } else if (event.target.parentNode.id === 'setting-save') {
    if (state.correntSettingTool === 'settingSave') {
      event.target.parentNode.classList.remove('settings-conteiner__item_button-active');
      state.correntSettingTool = '';
      settingSaveConteiner.style.display = 'none';
    } else {
      for (let i = 0; i < arrSetting.children.length; i += 1) {
        arrSetting.children[i].children[0].classList.remove('settings-conteiner__item_button-active');
      }
      settingResizeConteiner.style.display = 'none';
      settingImportConteiner.style.display = 'none';
      settingExportConteiner.style.display = 'none';
      state.correntSettingTool = 'settingSave';
      event.target.parentNode.classList.add('settings-conteiner__item_button-active');
      settingSaveConteiner.style.display = 'block';
    }
    localStorage.setItem('correntSettingTool', state.correntSettingTool);
  } else if (event.target.parentNode.id === 'setting-export') {
    if (state.correntSettingTool === 'settingExport') {
      event.target.parentNode.classList.remove('settings-conteiner__item_button-active');
      state.correntSettingTool = '';
      settingExportConteiner.style.display = 'none';
    } else {
      for (let i = 0; i < arrSetting.children.length; i += 1) {
        arrSetting.children[i].children[0].classList.remove('settings-conteiner__item_button-active');
      }
      settingResizeConteiner.style.display = 'none';
      settingSaveConteiner.style.display = 'none';
      settingImportConteiner.style.display = 'none';
      state.correntSettingTool = 'settingExport';
      event.target.parentNode.classList.add('settings-conteiner__item_button-active');
      settingExportConteiner.style.display = 'block';
    }
    localStorage.setItem('correntSettingTool', state.correntSettingTool);
  } else if (event.target.parentNode.id === 'setting-import') {
    if (state.correntSettingTool === 'settingImport') {
      event.target.parentNode.classList.remove('settings-conteiner__item_button-active');
      state.correntSettingTool = '';
      settingImportConteiner.style.display = 'none';
    } else {
      for (let i = 0; i < arrSetting.children.length; i += 1) {
        arrSetting.children[i].children[0].classList.remove('settings-conteiner__item_button-active');
      }
      settingResizeConteiner.style.display = 'none';
      settingSaveConteiner.style.display = 'none';
      settingExportConteiner.style.display = 'none';
      state.correntSettingTool = 'settingImport';
      event.target.parentNode.classList.add('settings-conteiner__item_button-active');
      settingImportConteiner.style.display = 'block';
    }
    localStorage.setItem('correntSettingTool', state.correntSettingTool);
  }
});

swapColors.addEventListener('click', () => {
  const primaryColor = document.querySelector('.color-conteiner__primary_item').value;
  const secondaryColor = document.querySelector('.color-conteiner__secondary_item').value;
  document.querySelector('.color-conteiner__primary_item').value = secondaryColor;
  document.querySelector('.color-conteiner__secondary_item').value = primaryColor;
  localStorage.setItem('primaryColor', document.querySelector('.color-conteiner__primary_item').value);
  localStorage.setItem('secondaryColor', document.querySelector('.color-conteiner__secondary_item').value);
});

canvas.addEventListener('mousedown', (event) => {
  const toolStroke = document.querySelector('#tool-stroke');
  const toolEraser = document.querySelector('#tool-eraser');
  const toolPen = document.querySelector('#tool-pen');
  const toolPaintBucket = document.querySelector('#tool-paint-bucket');
  const toolColorPicket = document.querySelector('#tool-color-picker');
  const toollighten = document.querySelector('#tool-lighten');
  const startX = event.offsetX;
  const startY = event.offsetY;
  const { which } = event;
  if (toolStroke.classList[1] === 'tools-conteiner__item_button-active') {
    const stroke = new Stroke(canvData32, canvData64, canvData128, startX, startY);
    stroke.start();
    preview.renameSizeFPS();
  }
  if (toolEraser.classList[1] === 'tools-conteiner__item_button-active') {
    const stroke = new Eraser(canvData32, canvData64, canvData128, startX, startY);
    stroke.start();
    preview.renameSizeFPS();
  }
  if (toolPen.classList[1] === 'tools-conteiner__item_button-active') {
    const stroke = new Pen(canvData32, canvData64, canvData128, startX, startY, which);
    stroke.start();
    preview.renameSizeFPS();
  }
  if (toolPaintBucket.classList[1] === 'tools-conteiner__item_button-active') {
    const stroke = new PaintBucket(canvData32, canvData64, canvData128, startX, startY);
    stroke.start();
    preview.renameSizeFPS();
  }
  if (toolColorPicket.classList[1] === 'tools-conteiner__item_button-active') {
    const colorPicker = new ColorPicker(event.target);
    colorPicker.start();
    localStorage.setItem('primaryColor', document.querySelector('.color-conteiner__primary_item').value);
  }
  if (toollighten.classList[1] === 'tools-conteiner__item_button-active') {
    const ctx = canvas.getContext('2d');
    const colorC = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    // eslint-disable-next-line max-len
    const stroke = new Lighten(colorC, canvData32, canvData64, canvData128, startX, startY, which, event.shiftKey);
    stroke.start();
    preview.renameSizeFPS();
  }
});

main.addEventListener('click', (event) => {
  const toolColorPicket = document.querySelector('#tool-color-picker');
  const { which } = event;
  if (toolColorPicket.classList[1] === 'tools-conteiner__item_button-active') {
    const colorPicker = new ColorPicker(event.target, which);
    colorPicker.start();
    localStorage.setItem('primaryColor', document.querySelector('.color-conteiner__primary_item').value);
  }
});

buttonAddFrame.addEventListener('mouseup', () => {
  const containerFrame = document.querySelector('.frame-container');
  // eslint-disable-next-line max-len
  [].map.call(containerFrame.children, item => item.classList.remove('container-current-frame-activ'));
  frameList.render();
  preview.renameSizeFPS();
});

if (localStorage.getItem('correntTool') !== null) {
  const localState = localStorage.getItem('correntTool');
  state.correntTool = localState;
  switch (localState) {
    case 'toolPen':
      toolsConteiner.children[0].children[0].children[0].classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${penCursorIcon}), auto`;
      break;
    case 'toolPaintBucket':
      toolsConteiner.children[0].children[1].children[0].classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${paintBucketCursorIcon}), auto`;
      break;
    case 'toolEraser':
      toolsConteiner.children[0].children[2].children[0].classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${eraserCursorIcon}), auto`;
      break;
    case 'toolStroke':
      toolsConteiner.children[0].children[3].children[0].classList.add('tools-conteiner__item_button-active');
      canvas.style.cursor = `url(${strokeCursorIcon}), auto`;
      break;
    case 'toolColorPicker':
      toolsConteiner.children[0].children[4].children[0].classList.add('tools-conteiner__item_button-active');
      document.body.children[1].style.cursor = `url(${colorPickerCursorIcon}), auto`;
      break;
    case 'toolLighten':
      toolsConteiner.children[0].children[5].children[0].classList.add('tools-conteiner__item_button-active');
      document.body.children[1].style.cursor = `url(${lightenCursorIcon}), auto`;
      break;
    default:
      break;
  }
}

if (localStorage.getItem('correntPenSize') !== null) {
  const localState = localStorage.getItem('correntPenSize');
  state.correntTool = localState;
  penSizeConteiner.children[0].classList.remove('tools-conteiner__item_button-active');
  switch (localState) {
    case 'pen-size-item1px':
      penSizeConteiner.children[0].classList.add('tools-conteiner__item_button-active');
      break;
    case 'pen-size-item2px':
      penSizeConteiner.children[1].classList.add('tools-conteiner__item_button-active');
      break;
    case 'pen-size-item3px':
      penSizeConteiner.children[2].classList.add('tools-conteiner__item_button-active');
      break;
    case 'pen-size-item4px':
      penSizeConteiner.children[3].classList.add('tools-conteiner__item_button-active');
      break;
    default:
      break;
  }
}

if (localStorage.getItem('correntSettingTool') !== null) {
  const localState = localStorage.getItem('correntSettingTool');
  const settingResizeConteiner = document.querySelector('.setting-resize-conteiner');
  const settingSaveConteiner = document.querySelector('.save-canvas-conteiner');
  const settingExportConteiner = document.querySelector('.export-canvas-conteiner');
  const settingImportConteiner = document.querySelector('.import-canvas-conteiner');
  state.correntTool = localState;
  switch (localState) {
    case 'settingResize':
      settingsConteiner.children[0].children[0].classList.add('settings-conteiner__item_button-active');
      settingResizeConteiner.style.display = 'block';
      break;
    case 'settingSave':
      settingsConteiner.children[1].children[0].classList.add('settings-conteiner__item_button-active');
      settingSaveConteiner.style.display = 'block';
      break;
    case 'settingExport':
      settingsConteiner.children[2].children[0].classList.add('settings-conteiner__item_button-active');
      settingExportConteiner.style.display = 'block';
      break;
    case 'settingImport':
      settingsConteiner.children[3].children[0].classList.add('settings-conteiner__item_button-active');
      settingImportConteiner.style.display = 'block';
      break;
    default:
      break;
  }
}

document.querySelector('.color-conteiner__primary_item').value = localStorage.getItem('primaryColor');
document.querySelector('.color-conteiner__secondary_item').value = localStorage.getItem('secondaryColor');
