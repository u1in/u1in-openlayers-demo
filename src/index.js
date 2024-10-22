import "normalize.css";
import "./index.css";
import {
  createMap,
  createFeature,
  useOption,
  onResolutionChange,
} from "./hooks";

// 默认EPSG:4326地图
createMap({
  target: "map", // dom的id
  zoom: 18, // 默认层级
  center: [108.31791628805635, 22.81558993690272], // 设置中心点(南宁朝阳)
});

// 添加锚点
createFeature([108.31791628805635, 22.81558993690272]); // 一桥对面
createFeature([108.31014987492578, 22.8075867066294]); // 一桥这边

// 地图层级变化监听
onResolutionChange(({ anchors, view }) => {
  anchors.map((anchor) => {
    const option = useOption();
    const style = anchor.getStyle();
    style.getImage().setScale(view.getZoom() / option.zoom); // 重新设置图标的缩放率，基于默认层级来做缩放
    anchor.setStyle(style);
  });
});
