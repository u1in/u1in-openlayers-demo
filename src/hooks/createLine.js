import { useLayers, useLines, useOption } from "./index.js";

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
  const line = new ol.Feature({
    geometry: new ol.geom.LineString(linePoins),
  });

  // 设置锚点feature样式
  line.setStyle(
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#459c50",
        width: 12,
      }),
    })
  );

  // 添加到图层
  layers.getSource().addFeature(line);

  if (!Array.isArray(lines)) {
    lines = [line];
  }
  if (Array.isArray(lines)) {
    lines.push(line);
  }

  return line;
};
