const calculatePosition = ({ q, r }, activeRadius) => {
  let position;

  if (activeRadius === 2) {
    position = {
      left: q * 99,
      top: r * 105 + (q * 105) / 2,
    };
  }

  if (activeRadius === 3) {
    position = {
      left: q * 85,
      top: r * 95 + (q * 97) / 2,
    };
  }

  if (activeRadius === 4) {
    position = {
      left: q * 75,
      top: r * 85 + (q * 87) / 2,
    };
  }

  return position;
};

export default calculatePosition;
