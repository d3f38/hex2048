import compareCoordinates from './compareCoordinates';

const combineHexMatrix = (hex1, hex2) => {
  const newHex = hex1.map((item) => {
    let newItem = item;

    for (let i = 0; i < hex2.length; i++) {
      const element = hex2[i];

      if (compareCoordinates(element, item)) {
        newItem = { ...element };
      }
    }

    return newItem;
  });

  return newHex;
};

export default combineHexMatrix;
