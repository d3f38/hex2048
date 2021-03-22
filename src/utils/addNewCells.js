import compareCoordinates from './compareCoordinates';

const addNewCells = (cells, currentHex) => {
  const tempHex = [...currentHex];

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    const index = currentHex.findIndex((item) => compareCoordinates(item, cell));

    tempHex[index] = cell;
  }

  return tempHex;
};

export default addNewCells;
