export default () => {
  if (!ol) {
    throw new Error("not found ol.");
  }
  return window.ol;
};
