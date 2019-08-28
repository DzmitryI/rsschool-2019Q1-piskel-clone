const colorPixel = (pixelPos, colorLayerData) => {
  const r = colorLayerData.data[pixelPos];
  const g = colorLayerData.data[pixelPos + 1];
  const b = colorLayerData.data[pixelPos + 2];
  return `rgba(${r},${g},${b})`;
};

module.exports.colorPixel = colorPixel;
