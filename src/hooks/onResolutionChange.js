export default (func) => {
  window.__u1in_ol__.view.on("change:resolution", function () {
    func(window.__u1in_ol__);
  });
};
