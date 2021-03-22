const calculatePosition = ({ q, r }) => {
  return {
    left: q * 99,
    top: r * 105 + (q * 105) / 2,
  };
};

export default calculatePosition;
