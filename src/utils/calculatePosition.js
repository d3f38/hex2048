const calculatePosition = ({ q, r }) => {
  return {
    left: q * 99,
    top: r * 103 + (q * 100) / 2,
  };
};

export default calculatePosition;
