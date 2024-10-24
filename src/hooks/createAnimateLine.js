import { useLayers, useLines, useOl } from "./index.js";

export default (
  linePoins = [],
  style = {
    src: "/svg/anchorStart.svg",
    anchor: [0.5, 1],
  },
  layers = useLayers()[1]
) => {
  // 获取当前features
  const lines = useLines();
  // 定义一个锚点feature
  const line = new ol.Feature({});
  // 当前绘制到线路图的第几个点
  let lineStep = 0;
  // 当前路径图在lines数组里面的index
  let lineIndex;

  if (!Array.isArray(lines)) {
    lines = [line];
    lineIndex = 0;
  }
  if (Array.isArray(lines)) {
    lineIndex = lines.push(line) - 1;
  }

  // 添加到图层
  layers.getSource().addFeature(line);

  const animate = (callback) =>
    requestAnimationFrame(() => {
      if (lineStep > linePoins.length) {
        callback();
        return;
      }
      const ol = useOl();
      const line = lines[lineIndex];

      console.log(linePoins.slice(0, lineStep));
      line.setGeometry(new ol.geom.LineString(linePoins.slice(0, lineStep)));

      // 设置锚点feature样式
      line.setStyle(
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: "#459c50",
            width: 12,
          }),
        })
      );

      // 执行下一帧动画
      lineStep++;

      // 递归调用
      animate(callback);
    });

  return (before, after) => {
    before();
    animate(after);
  };
};
