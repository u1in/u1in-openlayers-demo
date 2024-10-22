export default (interaction, func) => {
  interaction.on("drawend", func);
};
