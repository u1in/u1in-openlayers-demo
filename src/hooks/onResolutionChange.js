import { useView } from "./index";

export default (func) => {
  const view = useView();
  view.on("change:resolution", function () {
    func.call(this);
  });
};
