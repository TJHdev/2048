export const keyActions = {
  up: new Set(["ArrowUp", "KeyW"]),
  down: new Set(["ArrowDown", "KeyS"]),
  left: new Set(["ArrowLeft", "KeyA"]),
  right: new Set(["ArrowRight", "KeyD"]),
};

export const getColour = (value: number) => {
  const values = colorMap?.[value as keyof typeof colorMap] ?? colorMap[0];
  return "rgb(" + values.join(", ") + ")";
};

const colorMap = {
  "-1": [130, 0, 0],
  0: [202, 196, 200],
  2: [190, 196, 230],
  4: [170, 170, 230],
  8: [170, 150, 236],
  16: [160, 130, 236],
  32: [150, 110, 236],
  64: [140, 90, 236],
  128: [130, 70, 236],
  256: [120, 50, 236],
  512: [110, 30, 236],
  1024: [100, 10, 236],
  2048: [90, 0, 236],
};
