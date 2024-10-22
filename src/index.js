import "normalize.css";
import "./index.css";

// 南宁朝阳十字路口坐标 EPSG:4326坐标
const center = [108.31791628805635, 22.81558993690272];

// 默认层级
const zoom = 18;

// 瓦片图层，展示地图用
const tileLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

// 矢量图层，存放标记
const vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
});

// 定义一个锚点feature
const anchor = new ol.Feature({
  geometry: new ol.geom.Point(center),
});

// 设置锚点feature样式
anchor.setStyle(
  new ol.style.Style({
    image: new ol.style.Icon({
      src: "./public/svg/anchor.svg",
      anchor: [0.5, 1],
    }),
  })
);

// 添加到图层
vectorLayer.getSource().addFeature(anchor);

// 定义地图
const map = new ol.Map({
  target: "map",
  layers: [tileLayer, vectorLayer],
  view: new ol.View({
    // 定义坐标系标准为EPSG:4326
    projection: "EPSG:4326",
    center,
    zoom,
  }),
});

// 监听地图层级变化
map.getView().on("change:resolution", function () {
  const style = anchor.getStyle();
  // 重新设置图标的缩放率，基于层级10来做缩放
  style.getImage().setScale(this.getZoom() / zoom);
  anchor.setStyle(style);
});
