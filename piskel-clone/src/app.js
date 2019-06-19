import Index from './screens/canvas/index';

const controlConteiner = document.querySelector('.pen-size-conteiner');
const penTool = document.querySelector('#pen-tool');

const state = {
  correntTool: '',
  correntPenSize: '',
};

const app = new Index();
app.start();

controlConteiner.addEventListener('click', (event) => {
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

penTool.addEventListener('click', () => {
  if (state.correntTool === 'penTool') {
    penTool.classList.remove('tools-conteiner__item_button-active');
    state.correntTool = '';
  } else {
    state.correntTool = 'penTool';
    penTool.classList.add('tools-conteiner__item_button-active');
  }
});
