import Index from './screens/canvas/index';

const penSizeConteiner = document.querySelector('.pen-size-conteiner');
const toolsConteiner = document.querySelector('.tools-conteiner');
const swapColors = document.querySelector('#swap-colors');

const state = {
  correntTool: '',
  correntPenSize: '',
};

const app = new Index();
app.start();

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
  }
});

swapColors.addEventListener('click', () => {
  const primaryColor = document.querySelector('.color-conteiner__primary_item').value;
  document.querySelector('.color-conteiner__primary_item').value = document.querySelector('.color-conteiner__secondary_item').value;
  document.querySelector('.color-conteiner__secondary_item').value = primaryColor;
});
