const checkNextStep = (cells, coordLimit) => {
  const axes = ['x', 'y', 'z'];
  let hasNextStep = false;

  for (let j = 0; j < axes.length; j++) {
    const axis = axes[j];

    for (let i = -coordLimit; i <= coordLimit; i++) {
      const line = cells.filter((item) => i === item[axis]);

      for (let k = 0; k < line.length; k++) {
        if (line[k].value === 0 || (line[k + 1] && line[k].value === line[k + 1].value)) {
          hasNextStep = true;

          break;
        }
      }

      if (hasNextStep) break;
    }
  }

  return hasNextStep;
};

export default checkNextStep;
