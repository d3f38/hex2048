const generateHex = (radius) => {
  const hexMatrix = [];

  const limit = radius - 1;

  for (let x = -limit; x <= limit; x++) {
    for (let y = -limit; y <= limit; y++) {
      for (let z = -limit; z <= limit; z++) {
        if (x + y + z === 0) {
          hexMatrix.push({ x, y, z, value: 0 });
        }
      }
    }
  }

  return hexMatrix;
};

export default generateHex;
