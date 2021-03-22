import {
  generateHex,
  mergeLine,
  calculatePosition,
  addNewCells,
  combineHexMatrix,
  cubeToAxial,
  compareCoordinates,
  getLineByAxis,
  checkNextStep,
} from '../index';

describe('Tests utils:', () => {
  describe('generateHex', () => {
    it('should return initial hexagonal matrix with radius 2', () => {
      const radius = 2;
      const expected = [
        { x: -1, y: 0, z: 1, value: 0 },
        { x: -1, y: 1, z: 0, value: 0 },
        { x: 0, y: -1, z: 1, value: 0 },
        { x: 0, y: 0, z: 0, value: 0 },
        { x: 0, y: 1, z: -1, value: 0 },
        { x: 1, y: -1, z: 0, value: 0 },
        { x: 1, y: 0, z: -1, value: 0 },
      ];

      expect(generateHex(radius)).toEqual(expect.arrayContaining(expected));
    });

    it('should return initial hexagonal matrix with radius 3', () => {
      const radius = 3;
      const expected = [
        { x: -2, y: 0, z: 2, value: 0 },
        { x: -2, y: 1, z: 1, value: 0 },
        { x: -2, y: 2, z: 0, value: 0 },
        { x: -1, y: -1, z: 2, value: 0 },
        { x: -1, y: 0, z: 1, value: 0 },
        { x: -1, y: 1, z: 0, value: 0 },
        { x: -1, y: 2, z: -1, value: 0 },
        { x: 0, y: -2, z: 2, value: 0 },
        { x: 0, y: -1, z: 1, value: 0 },
        { x: 0, y: 0, z: 0, value: 0 },
        { x: 0, y: 1, z: -1, value: 0 },
        { x: 0, y: 2, z: -2, value: 0 },
        { x: 1, y: -2, z: 1, value: 0 },
        { x: 1, y: -1, z: 0, value: 0 },
        { x: 1, y: 0, z: -1, value: 0 },
        { x: 1, y: 1, z: -2, value: 0 },
        { x: 2, y: -2, z: 0, value: 0 },
        { x: 2, y: -1, z: -1, value: 0 },
        { x: 2, y: 0, z: -2, value: 0 },
      ];

      expect(generateHex(radius)).toEqual(expect.arrayContaining(expected));
    });

    it('should return initial hexagonal matrix with radius 4', () => {
      const radius = 4;
      const expected = [
        { x: -3, y: 0, z: 3, value: 0 },
        { x: -3, y: 1, z: 2, value: 0 },
        { x: -3, y: 2, z: 1, value: 0 },
        { x: -3, y: 3, z: 0, value: 0 },
        { x: -2, y: -1, z: 3, value: 0 },
        { x: -2, y: 0, z: 2, value: 0 },
        { x: -2, y: 1, z: 1, value: 0 },
        { x: -2, y: 2, z: 0, value: 0 },
        { x: -2, y: 3, z: -1, value: 0 },
        { x: -1, y: -2, z: 3, value: 0 },
        { x: -1, y: -1, z: 2, value: 0 },
        { x: -1, y: 0, z: 1, value: 0 },
        { x: -1, y: 1, z: 0, value: 0 },
        { x: -1, y: 2, z: -1, value: 0 },
        { x: -1, y: 3, z: -2, value: 0 },
        { x: 0, y: -3, z: 3, value: 0 },
        { x: 0, y: -2, z: 2, value: 0 },
        { x: 0, y: -1, z: 1, value: 0 },
        { x: 0, y: 0, z: 0, value: 0 },
        { x: 0, y: 1, z: -1, value: 0 },
        { x: 0, y: 2, z: -2, value: 0 },
        { x: 0, y: 3, z: -3, value: 0 },
        { x: 1, y: -3, z: 2, value: 0 },
        { x: 1, y: -2, z: 1, value: 0 },
        { x: 1, y: -1, z: 0, value: 0 },
        { x: 1, y: 0, z: -1, value: 0 },
        { x: 1, y: 1, z: -2, value: 0 },
        { x: 1, y: 2, z: -3, value: 0 },
        { x: 2, y: -3, z: 1, value: 0 },
        { x: 2, y: -2, z: 0, value: 0 },
        { x: 2, y: -1, z: -1, value: 0 },
        { x: 2, y: 0, z: -2, value: 0 },
        { x: 2, y: 1, z: -3, value: 0 },
        { x: 3, y: -3, z: 0, value: 0 },
        { x: 3, y: -2, z: -1, value: 0 },
        { x: 3, y: -1, z: -2, value: 0 },
        { x: 3, y: 0, z: -3, value: 0 },
      ];

      expect(generateHex(radius)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('mergeLine', () => {
    it('should return merged line', () => {
      const expected = [
        { value: 4, x: 0, y: 0, z: 0 },
        { value: 4, x: -1, y: 0, z: 1 },
      ];

      expect(
        mergeLine(
          [
            { x: -1, y: 0, z: 1, value: 4 },
            { x: 0, y: 0, z: 0, value: 2 },
            { x: 1, y: 0, z: -1, value: 2 },
          ],
          0
        )
      ).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('cubeToAxial', () => {
    it('should return hexagonal matrix in axial coordinates', () => {
      const initialHex = [
        { x: -1, y: 1, z: 0 },
        { x: -1, y: 0, z: 1 },
        { x: 0, y: 1, z: -1 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: -1, z: 1 },
        { x: 1, y: 0, z: -1 },
        { x: 1, y: -1, z: 0 },
      ];
      const expected = [
        { q: -1, r: 0, s: 1 },
        { q: -1, r: 1, s: 0 },
        { q: 0, r: -1, s: 1 },
        { q: 0, r: 0, s: -0 },
        { q: 0, r: 1, s: -1 },
        { q: 1, r: -1, s: 0 },
        { q: 1, r: 0, s: -1 },
      ];

      expect(cubeToAxial(initialHex)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('calculatePosition', () => {
    it('should return calculated positions', () => {
      const expected = {
        left: -99,
        top: 53,
      };

      expect(calculatePosition({ q: -1, r: 1, s: 0 })).toEqual(expect.objectContaining(expected));
    });
  });

  describe('addNewCells', () => {
    it('should add new cell to hex', () => {
      const initialHex = [
        { x: -1, y: 0, z: 1, value: 0 },
        { x: -1, y: 1, z: 0, value: 2 },
        { x: 0, y: -1, z: 1, value: 0 },
        { x: 0, y: 0, z: 0, value: 4 },
        { x: 0, y: 1, z: -1, value: 0 },
        { x: 1, y: -1, z: 0, value: 0 },
        { x: 1, y: 0, z: -1, value: 2 },
      ];

      const newCells = [{ x: 1, y: -1, z: 0, value: 0 }];

      const expected = [
        { x: -1, y: 0, z: 1, value: 0 },
        { x: -1, y: 1, z: 0, value: 2 },
        { x: 0, y: -1, z: 1, value: 0 },
        { x: 0, y: 0, z: 0, value: 4 },
        { x: 0, y: 1, z: -1, value: 0 },
        { x: 1, y: -1, z: 0, value: 0 },
        { x: 1, y: 0, z: -1, value: 2 },
      ];

      expect(addNewCells(newCells, initialHex)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('combineHexMatrix', () => {
    it('should combine two hex matrices', () => {
      const initialHex = [
        { x: -1, y: 0, z: 1, value: 0 },
        { x: -1, y: 1, z: 0, value: 0 },
        { x: 0, y: -1, z: 1, value: 0 },
        { x: 0, y: 0, z: 0, value: 0 },
        { x: 0, y: 1, z: -1, value: 0 },
        { x: 1, y: -1, z: 0, value: 0 },
        { x: 1, y: 0, z: -1, value: 0 },
      ];

      const newHex = [
        { x: 0, y: -1, z: 1, value: 2 },
        { x: 1, y: -1, z: 0, value: 2 },
        { x: 1, y: 0, z: -1, value: 2 },
      ];

      const expected = [
        { x: -1, y: 0, z: 1, value: 0 },
        { x: -1, y: 1, z: 0, value: 0 },
        { x: 0, y: -1, z: 1, value: 2 },
        { x: 0, y: 0, z: 0, value: 0 },
        { x: 0, y: 1, z: -1, value: 0 },
        { x: 1, y: -1, z: 0, value: 2 },
        { x: 1, y: 0, z: -1, value: 2 },
      ];

      expect(combineHexMatrix(initialHex, newHex)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('compareCoordinates', () => {
    it('should return true if coordinates are the same', () => {
      expect(
        compareCoordinates({ x: -1, y: 0, z: 1, value: 0 }, { x: -1, y: 0, z: 1, value: 2 })
      ).toBe(true);
    });

    it('should return false if coordinates are not the same', () => {
      expect(
        compareCoordinates({ x: 1, y: -1, z: 0, value: 2 }, { x: 1, y: 0, z: 0, value: 2 })
      ).toBe(false);
    });
  });

  describe('getLineByAxis', () => {
    it('should return line by axis', () => {
      const initialHex = [
        { x: -1, y: 0, z: 1, value: 0 },
        { x: -1, y: 1, z: 0, value: 0 },
        { x: 0, y: -1, z: 1, value: 0 },
        { x: 0, y: 0, z: 0, value: 0 },
        { x: 0, y: 1, z: -1, value: 4 },
        { x: 1, y: -1, z: 0, value: 0 },
        { x: 1, y: 0, z: -1, value: 2 },
      ];

      const expected = [
        { x: 0, y: 1, z: -1, value: 4 },
        { x: 0, y: 0, z: 0, value: 0 },
        { x: 0, y: -1, z: 1, value: 0 },
      ];

      expect(getLineByAxis(initialHex, 0, 'x', 'y')).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('checkNextStep', () => {
    it('should return true if next step exists', () => {
      const resultHex = [
        { x: -1, y: 0, z: 1, value: 16 },
        { x: -1, y: 1, z: 0, value: 4 },
        { x: 0, y: -1, z: 1, value: 8 },
        { x: 0, y: 0, z: 0, value: 16 },
        { x: 0, y: 1, z: -1, value: 32 },
        { x: 1, y: -1, z: 0, value: 64 },
        { x: 1, y: 0, z: -1, value: 128 },
      ];

      expect(checkNextStep(resultHex, 1)).toBe(true);
    });

    it('should return false if next step does not exist', () => {
      const resultHex = [
        { x: -1, y: 0, z: 1, value: 2 },
        { x: -1, y: 1, z: 0, value: 4 },
        { x: 0, y: -1, z: 1, value: 8 },
        { x: 0, y: 0, z: 0, value: 16 },
        { x: 0, y: 1, z: -1, value: 32 },
        { x: 1, y: -1, z: 0, value: 64 },
        { x: 1, y: 0, z: -1, value: 128 },
      ];

      expect(checkNextStep(resultHex, 1)).toBe(false);
    });
  });
});
