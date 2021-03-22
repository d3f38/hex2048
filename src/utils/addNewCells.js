import compareCoordinates from './compareCoordinates';

const addNewCells = (cells, currentHex) => {
  const tempHex = currentHex.map((e) => ({ ...e, isNew: false }));

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.isNew = true;

    const index = currentHex.findIndex((item) => compareCoordinates(item, cell));

    tempHex[index] = cell;
  }

  return tempHex;
};

export default addNewCells;
