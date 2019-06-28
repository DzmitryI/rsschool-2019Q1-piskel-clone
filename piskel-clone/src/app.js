import Index from './screens/canvas/index';
import Preview from './screens/preview/Preview';
import FrameList from './components/frame-list/FrameList';
import Resize from './components/model-dialog/Resize/Resize';
import Save from './screens/export/save/Save';
import Import from './screens/import/Import';
import Export from './screens/export/Export';

const penSizeConteiner = document.querySelector('.pen-size-conteiner');
const toolsConteiner = document.querySelector('.tools-conteiner');
const settingsConteiner = document.querySelector('.settings-conteiner__list');
const swapColors = document.querySelector('#swap-colors');
// const buttonAddFrame = document.getElementById('addFrame');
// const sizeFPS = document.getElementById('sizeFPS');

const state = {
  correntTool: '',
  correntPenSize: '',
  correntSettingTool: '',
};

const app = new Index();
app.start();

const resize = new Resize();
resize.init();

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
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].classList.remove('tools-conteiner__item_button-active');
      }
      event.target.classList.add('tools-conteiner__item_button-active');
    }
  } else if (event.target.classList[1] === 'pen-size-item2px') {
    if (state.correntPenSize === 'pen-size-item2px') {
      event.target.classList.remove('tools-conteiner__item_button-active');
      state.correntPenSize = '';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntPenSize = 'pen-size-item2px';
      event.target.classList.add('tools-conteiner__item_button-active');
    }
  } else if (event.target.classList[1] === 'pen-size-item3px') {
    if (state.correntPenSize === 'pen-size-item3px') {
      event.target.classList.remove('tools-conteiner__item_button-active');
      state.correntPenSize = '';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntPenSize = 'pen-size-item3px';
      event.target.classList.add('tools-conteiner__item_button-active');
    }
  } else if (event.target.classList[1] === 'pen-size-item4px') {
    if (state.correntPenSize === 'pen-size-item4px') {
      event.target.classList.remove('tools-conteiner__item_button-active');
      state.correntPenSize = '';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntPenSize = 'pen-size-item4px';
      event.target.classList.add('tools-conteiner__item_button-active');
    }
  }
});

toolsConteiner.addEventListener('click', (event) => {
  const arrSize = event.target.parentNode.parentNode.parentNode.children;
  if (event.target.parentNode.id === 'tool-pen') {
    if (state.correntTool === 'toolPen') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolPen';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
    }
  } else if (event.target.parentNode.id === 'tool-paint-bucket') {
    if (state.correntTool === 'toolPaintBucket') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolPaintBucket';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
    }
  } else if (event.target.parentNode.id === 'tool-eraser') {
    if (state.correntTool === 'toolEraser') {
      event.target.parentNode.classList.remove('tools-conteiner__item_button-active');
      state.correntTool = '';
    } else {
      for (let i = 0; i < arrSize.length; i += 1) {
        arrSize[i].children[0].classList.remove('tools-conteiner__item_button-active');
      }
      state.correntTool = 'toolEraser';
      event.target.parentNode.classList.add('tools-conteiner__item_button-active');
    }
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
  }
});

swapColors.addEventListener('click', () => {
  const primaryColor = document.querySelector('.color-conteiner__primary_item').value;
  document.querySelector('.color-conteiner__primary_item').value = document.querySelector('.color-conteiner__secondary_item').value;
  document.querySelector('.color-conteiner__secondary_item').value = primaryColor;
});
