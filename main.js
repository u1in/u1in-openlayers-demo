import "normalize.css";
import "./style.css";

const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.transform(
      [108.31791628805635, 22.81558993690272],
      "EPSG:4326",
      "EPSG:3857"
    ),
    zoom: 18,
  }),
});
