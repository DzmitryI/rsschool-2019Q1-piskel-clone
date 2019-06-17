import './index.scss';
import paintBacketIcon from './assets/icons/paint_backet.png';
import chooseColorIcon from './assets/icons/choose_color.png';
import moveIcon from './assets/icons/move.png';
import transformBacketIcon from './assets/icons/transform.png';
import swapColrsIcon from './assets/icons/swap_color.png';

export default class Index {
  constructor() {
    this.form = document;
  }

  start() {
    const paintBacket = this.form.getElementById('paint-backet');
    paintBacket.src = paintBacketIcon;
    const chooseColor = this.form.getElementById('choose-color');
    chooseColor.src = chooseColorIcon;
    const move = this.form.getElementById('move');
    move.src = moveIcon;
    const transform = this.form.getElementById('transform');
    transform.src = transformBacketIcon;
    const swapColors = this.form.getElementById('swap-colors');
    swapColors.src = swapColrsIcon;

    const canvas = this.form.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    const x = canvas.width / 32;
    // const y = canvas.height;
    for (let i = 0; i <= 32; i += 1) {
      ctx.beginPath(); // Начинает новый путь
      ctx.moveTo(0, x * (i)); // Передвигает перо в точку (30, 50)
      ctx.lineTo(400, x * (i)); // Рисует линию до точки (150, 100)
      ctx.stroke();
      // for (let j = 0; j < i; j += 1) {
      // ctx.beginPath(); // Начинает новый путь
      ctx.moveTo(x * (i), 0); // Передвигает перо в точку (30, 50)
      ctx.lineTo(x * (i), 400); // Рисует линию до точки (150, 100)
      ctx.stroke(); // Отображает путь
      //   // ctx.beginPath();
      //   // ctx.moveTo(0, 25); // Передвигает перо в точку (30, 50)
      //   // ctx.lineTo(400, 25); // Рисует линию до точки (150, 100)
      //   // ctx.stroke(); // Отображает путь
      // }
    }
  }
}
