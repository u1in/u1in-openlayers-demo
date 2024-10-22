import { useMap, useOl, useInteractions, onDrawEnd } from "./index";

export default (interaction) => {
  const ol = useOl();
  const map = useMap();
  const interactions = useInteractions();
  map.addInteraction(interaction);

  if (!Array.isArray(interactions)) {
    interactions = [interaction];
  }
  if (Array.isArray(interactions)) {
    interactions.push(interaction);
  }
  return {
    onDrawEnd(func) {
      onDrawEnd.call(this, interaction, func);
    },
  };
};
