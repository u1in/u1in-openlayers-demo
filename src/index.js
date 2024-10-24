import "normalize.css";
import "./index.css";
import {
  createMap,
  createFeature,
  onResolutionChange,
  createAnimateLine,
} from "./hooks";
import lineJson from "./line.json";

// 默认EPSG:4326地图
const { ol, view, option, features, layers, lines } = createMap({
  target: "map", // dom的id
  zoom: 18, // 默认层级
  center: [108.31791628805635, 22.81558993690272], // 设置中心点(南宁朝阳)
});

// 创建返回中心按钮
document.getElementById("back2center").addEventListener("click", function () {
  view.animate({ center: option.center, ease: ol.easing.easeOut });
});
document.getElementById("back2center").classList.remove("hidden");

// 全局地图层级变化监听
onResolutionChange(() => {
  // 这里根据层级的分辨率算放大倍率，层级+1，放大1倍
  const zoomRate = Math.pow(2, view.getZoom() - option.zoom);
  // 这个是根据层级比例，缓慢放大
  const zoomRate2 = (view.getZoom() * 0.8) / option.zoom;
  features.map((feature) => {
    const style = feature.getStyle();
    style.getImage().setScale(zoomRate2); // 这里根据层级倍率缩放，变动幅度小，使得锚点容易分辨
    feature.setStyle(style);
  });
  lines.map((line) => {
    const style = line.getStyle();
    style.getStroke().setWidth((12 * zoomRate2).toFixed(1)); // 这里根据分辨率缩放，符合地图元素放大缩小直觉
    line.setStyle(style);
  });
});

// 划线
// createLine(lineJson);

const drawLine = () => {
  const animate = createAnimateLine(lineJson);
  animate(
    () => {
      // before
      createFeature(lineJson[0], {
        src: "/svg/anchorStart.svg",
        anchor: [0.5, 1],
      }); // 路径起点
    },
    () => {
      // after
      createFeature(lineJson[lineJson.length - 1], {
        src: "/svg/anchorEnd.svg",
        anchor: [0.5, 1],
      }); // 路径终点
    }
  );
};

// 创建测试按钮
document.getElementById("funcbutton").addEventListener("click", drawLine);
document.getElementById("funcbutton").classList.remove("hidden");

// 描点工具
// const interaction = createInteraction(
//   new ol.interaction.Draw({
//     type: "LineString",
//     source: layers[2].getSource(), // 注意设置source，这样绘制好的线，就会添加到这个source里
//     style: new ol.style.Style({
//       // 设置绘制时的样式
//       stroke: new ol.style.Stroke({
//         color: "red",
//         size: 2,
//       }),
//     }),
//     maxPoints: 12, // 限制不超过4个点
//   })
// );

// interaction.onDrawEnd((event) => {
//   console.log(JSON.stringify(event.feature.getGeometry().getCoordinates()));
// });
