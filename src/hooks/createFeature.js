import { useFeatures, useLayers, useOption } from "./index.js";

export default (
  point = useOption().center,
  style = {
    src: "/svg/anchor.svg",
    anchor: [0.5, 1],
  },
  layers = useLayers()[2]
) => {
  // 获取当前features
  const features = useFeatures();

  // 定义一个锚点feature
  const anchor = new ol.Feature({
    geometry: new ol.geom.Point(point),
  });

  // 设置锚点feature样式
  anchor.setStyle(
    new ol.style.Style({
      image: new ol.style.Icon(style),
    })
  );

  // 添加到图层
  layers.getSource().addFeature(anchor);

  if (!Array.isArray(features)) {
    features = [anchor];
  }
  if (Array.isArray(features)) {
    features.push(anchor);
  }

  return anchor;
};
