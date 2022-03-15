export default {
  // 添加文字水印
  addWaterMarker(str) {
    var can = document.createElement('canvas');
    var dom = document.querySelector('.search-wrap');
    var ctx = can.getContext('2d');

    dom.appendChild(can);

    can.width = 200;
    can.height = 160;
    can.style.display = 'none';

    ctx.rotate((-20 * Math.PI) / 180);
    ctx.font = '16px Microsoft JhengHei';
    ctx.fillStyle = 'rgba(17, 17, 17, 0.50)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'Middle';
    ctx.fillText(str, can.width / 3, can.height / 2);

    dom.style.backgroundImage = 'url(' + can.toDataURL() + ')';
  },
};
