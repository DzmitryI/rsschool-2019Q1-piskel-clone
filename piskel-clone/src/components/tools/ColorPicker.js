export default class ColorPicker {
  constructor(target) {
    this.form = document;
    this.target = target;
  }

  start() {
    const hex2rgb = (rgb) => {
      const rgba = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

      return (rgba && rgba.length === 4) ? `#${
        (`0${parseInt(rgba[1], 10).toString(16)}`).slice(-2)
      }${(`0${parseInt(rgba[2], 10).toString(16)}`).slice(-2)
      }${(`0${parseInt(rgba[3], 10).toString(16)}`).slice(-2)}` : '';
    };
    const newColor = hex2rgb(window.getComputedStyle(this.target).backgroundColor);
    this.form.querySelector('.color-conteiner__primary_item').value = newColor;
  }
}
