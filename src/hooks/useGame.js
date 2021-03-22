import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import {
  generateHex,
  addNewCells,
  mergeLine,
  combineHexMatrix,
  cubeToAxial,
  compareCoordinates,
  getLineByAxis,
  checkNextStep,
} from '../utils';

const PRESSED_BUTTONS = {
  KeyQ: { axis: 'z', sortBy: 'y' },
  KeyW: { axis: 'x', sortBy: 'y' },
  KeyE: { axis: 'y', sortBy: 'x' },
  KeyA: { axis: 'y', sortBy: 'z' },
  KeyS: { axis: 'x', sortBy: 'z' },
  KeyD: { axis: 'z', sortBy: 'x' },
};

const useGame = (server, activeRadius) => {
  const [init, setInit] = useState(false);
  const [cells, setCells] = useState(generateHex(activeRadius));
  const [visibleHex, setVisibleHex] = useState([]);
  const [statusGame, setStatusGame] = useState('playing');

  const coordLimit = activeRadius - 1;

  const getNewCell = useCallback(
    (currentHex) => {
      const prevCells = JSON.parse(sessionStorage.getItem('cells'));

      const isSameHex = currentHex.every((item1) =>
        prevCells.some((item2) => compareCoordinates(item1, item2) && item1.value === item2.value)
      );

      if (!isSameHex) {
        axios
          .post(
            `${server}/${activeRadius}`,
            currentHex.filter((item) => item.value > 0)
          )
          .then(({ data }) => {
            if (data.length) {
              const updatedCells = addNewCells(data, currentHex);

              setVisibleHex(cubeToAxial(updatedCells));
              setCells(updatedCells);

              sessionStorage.setItem('cells', JSON.stringify(updatedCells));
            } else {
              setStatusGame('game-over');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [server, activeRadius]
  );

  const listener = useCallback(
    ({ code }) => {
      const temp = cells && cells.map((e) => e);
      const currentPressedButton = PRESSED_BUTTONS[code];

      if (currentPressedButton) {
        let newTemp = [];

        for (let i = -coordLimit; i <= coordLimit; i++) {
          const line = getLineByAxis(
            temp,
            i,
            currentPressedButton.axis,
            currentPressedButton.sortBy
          );

          newTemp = [...newTemp, ...mergeLine(line, 0)];
        }

        getNewCell(newTemp);
      }
    },
    [cells, activeRadius]
  );

  useEffect(() => {
    if (cells.length) {
      const hasNextStep = checkNextStep(cells, coordLimit);

      if (!hasNextStep) {
        setStatusGame('game-over');
      }
    }
  }, [cells]);

  useEffect(() => {
    window.addEventListener('keypress', listener);

    return () => {
      window.removeEventListener('keypress', listener);
    };
  }, [listener]);

  useEffect(() => {
    if (activeRadius && !init) {
      const initCells = generateHex(activeRadius);
      setCells(initCells);

      setInit(true);
    }
  }, [activeRadius]);

  useEffect(() => {
    if (activeRadius && init) {
      const initCells = generateHex(activeRadius);
      setCells(initCells);

      axios
        .post(`${server}/${activeRadius}`, [])
        .then(({ data }) => {
          const updatedCells = combineHexMatrix(initCells, data);

          setVisibleHex(cubeToAxial(updatedCells));
          setCells(updatedCells);

          sessionStorage.setItem('cells', JSON.stringify(updatedCells));
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [init, activeRadius]);

  return { activeRadius, cells, statusGame, visibleHex };
};

export default useGame;
