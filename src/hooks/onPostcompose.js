export default (instance, func) => {
  instance.on("postcompose", function () {
    func.call(this);
  });
};
