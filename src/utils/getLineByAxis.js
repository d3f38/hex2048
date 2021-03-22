const getLineByAxis = (array, coord, axis, sortBy) =>
  array.filter((item) => coord === item[axis]).sort((a, b) => b[sortBy] - a[sortBy]);

export default getLineByAxis;
