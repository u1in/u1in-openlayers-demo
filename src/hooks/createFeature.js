export default (
  point = window.__u1in_ol__.option.center,
  style = {
    src: "./public/svg/anchor.svg",
    anchor: [0.5, 1],
  },
  layers = window.__u1in_ol__.layers[1]
) => {
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

  if(!Array.isArray(window.__u1in_ol__.anchors)) {
    window.__u1in_ol__.anchors = [anchor];
  }
  if(Array.isArray(window.__u1in_ol__.anchors)) {
    window.__u1in_ol__.anchors.push(anchor);
  }

  return anchor;
};
