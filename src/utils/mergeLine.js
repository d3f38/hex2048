const mergeLine = (array, count) => {
  const line = [...array];

  for (let i = 0; i < line.length; i++) {
    if (line[i + 1] !== undefined) {
      if (line[i].value === 0) {
        line[i].value += line[i + 1].value;
        line[i + 1].value = 0;
      }
    }
  }

  if (count < line.length) {
    mergeLine(line, count + 1);
  } else {
    for (let i = 0; i < line.length; i++) {
      if (line[i + 1] !== undefined) {
        if (line[i].value === 0 || line[i].value === line[i + 1].value) {
          line[i].value += line[i + 1].value;
          line[i + 1].value = 0;
        }
      }
    }
  }

  return line;
};

export default mergeLine;
