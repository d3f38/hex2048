const cubeToAxial = (initialHex) =>
  initialHex.map((item) => ({ q: item.x, r: item.z, s: -item.x - item.z }));

export default cubeToAxial;
