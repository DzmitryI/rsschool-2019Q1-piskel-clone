const currentPixel = (canvas, canvasData, startX, startY, sizePen, which) => {
  const primaryColor = document.querySelector('.color-conteiner__primary_item').value;
  const secondaryColor = document.querySelector('.color-conteiner__secondary_item').value;
  const ctx = canvas.getContext('2d');
  if (which === 1) ctx.fillStyle = primaryColor;
  else if (which === 3) ctx.fillStyle = secondaryColor;
  for (let i = 0; i < canvasData.length; i += 1) {
    const xi = canvasData[i][0] + canvasData[i][2];
    const yi = canvasData[i][1] + canvasData[i][3];
    if ((startX <= xi) && (startY <= yi)) {
      // eslint-disable-next-line max-len
      ctx.clearRect(canvasData[i][0] - sizePen, canvasData[i][1] - sizePen, canvasData[i][2] + sizePen, canvasData[i][3] + sizePen);
      // eslint-disable-next-line max-len
      ctx.fillRect(canvasData[i][0] - sizePen, canvasData[i][1] - sizePen, canvasData[i][2] + sizePen, canvasData[i][3] + sizePen);
      break;
    }
  }
};

module.exports.currentPixel = currentPixel;
