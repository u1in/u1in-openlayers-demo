export default (options) => {
  const { target, center = [0, 0], zoom = 18 } = options;

  if (!ol) {
    throw new Error("not found ol.");
  }

  if (!target) {
    throw new Error("target must be set");
  }

  // 瓦片图层，展示地图用
  const tileLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
  });

  // 矢量图层，存放标记
  const vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
  });

  // EPSG:4325视图
  const view = new ol.View({
    // 定义坐标系标准为EPSG:4326
    projection: "EPSG:4326",
    center,
    zoom,
  });

  // 固定一个地图层和一个feature层
  // 如有改动以后再加
  const layers = [tileLayer, vectorLayer];

  // 设置地图
  const map = new ol.Map({
    target,
    layers,
    view,
  });

  window.__u1in_ol__ = {
    options,
    map,
    layers,
    view,
    anchors: [],
  };

  // 返回给调用方
  return window.__u1in_ol__;
};
