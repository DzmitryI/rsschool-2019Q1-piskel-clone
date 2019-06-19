import Index from './screens/canvas/index';

const penTool = document.querySelector('#pen-tool');
const state = {
  correntTool: '',
};

const app = new Index();
app.start();

penTool.addEventListener('click', () => {
  if (state.correntTool === 'penTool') {
    penTool.classList.remove('tools-conteiner__item_button-active');
    state.correntTool = '';
  } else {
    state.correntTool = 'penTool';
    penTool.classList.add('tools-conteiner__item_button-active');
  }
});
