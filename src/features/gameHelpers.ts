import { cloneDeep } from "lodash";
import { Direction, GridState } from "./types";

export const createNewGrid = (width = 6, height = 6) => {
  return Array.from(Array(width), () => new Array(height).fill(0));
};

export const combineLine = (line: number[]) => {
  let lastSummableCellIndex = -1;
  let lastSummableCellValue = 0;

  const combinedLine = [...line];

  combinedLine.forEach((cell, index) => {
    if (cell !== 0) {
      if (lastSummableCellValue === cell) {
        combinedLine[lastSummableCellIndex] = cell + cell;
        combinedLine[index] = 0;
        lastSummableCellIndex = -1;
        lastSummableCellValue = 0;
      } else if (cell === -1) {
        lastSummableCellIndex = -1;
        lastSummableCellValue = 0;
      } else {
        lastSummableCellIndex = index;
        lastSummableCellValue = cell;
      }
    }
  });

  return combinedLine;
};

export const compressLine = (line: number[]) => {
  const originalLength = line.length;
  const obstacleIndexes = line.reduce((acc, curr, index) => {
    if (curr === -1) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  obstacleIndexes.push(originalLength);

  let startSliceIndex = 0;

  const compressedPartialArrays = obstacleIndexes.reduce((acc, index) => {
    const partialArray = line.slice(startSliceIndex, index);
    startSliceIndex = index + 1;

    const originalLength = partialArray.length;
    const lineEmptyRemoved = partialArray.filter((cell) => cell !== 0);
    const newLength = lineEmptyRemoved.length;
    const padLength = originalLength - newLength;
    const pad = new Array(padLength).fill(0);
    const newLine = lineEmptyRemoved.concat(pad);

    acc.push(newLine);
    return acc;
  }, [] as number[][]);

  const joinedArrays = compressedPartialArrays.reduce((acc, curr, index) => {
    if (index === 0) {
      return acc.concat(curr);
    }
    return acc.concat([-1, ...curr]);
  }, []);

  return joinedArrays;
};

export const getCellsCount = (grid: GridState, cellValue = 0) => {
  let emptyCells = 0;

  grid.forEach((row) =>
    row.forEach((cell) => {
      if (cell === cellValue) {
        emptyCells++;
      }
    })
  );

  return emptyCells;
};

export const placeNumberInAvailableCellNumber = (
  grid: GridState,
  cellNumber: number,
  cellValue: number
) => {
  let emptyCells = 0;

  grid.forEach((column, rowIndex) =>
    column.forEach((cell, colIndex) => {
      if (cell === 0) {
        if (emptyCells === cellNumber) {
          grid[rowIndex][colIndex] = cellValue;
        }
        emptyCells++;
      }
    })
  );

  return grid;
};

export const placeValueInRandomAvailableCell = ({
  grid,
  value,
}: {
  grid: GridState;
  value: number;
}) => {
  const availableCells = getCellsCount(grid);
  const cellPositionToPlace = Math.floor(Math.random() * availableCells);
  return placeNumberInAvailableCellNumber(grid, cellPositionToPlace, value);
};

export const rotate90 = (matrix: GridState): GridState => {
  const width = matrix.length;
  const height = matrix[0].length;
  let b = new Array(height);

  for (let y = 0; y < height; y++) {
    b[y] = new Array(width);

    for (let x = 0; x < width; x++) {
      b[y][x] = matrix[width - 1 - x][y];
    }
  }

  return b;
};

export const rotate180 = (matrix: GridState): GridState => {
  const width = matrix[0].length;
  const height = matrix.length;
  let b = new Array(height);

  for (let y = 0; y < height; y++) {
    let n = height - 1 - y;
    b[n] = new Array(width);

    for (let x = 0; x < width; x++) {
      b[n][width - 1 - x] = matrix[y][x];
    }
  }

  return b;
};

export const rotate270 = (matrix: GridState): GridState => {
  const width = matrix.length;
  const height = matrix[0].length;
  let b = new Array(height);

  for (let y = 0; y < height; y++) {
    b[y] = new Array(width);

    for (let x = 0; x < width; x++) {
      b[y][x] = matrix[x][height - 1 - y];
    }
  }

  return b;
};

export const getRotatedGrid = ({
  direction,
  grid,
  reverse,
}: {
  direction: Direction;
  grid: GridState;
  reverse?: true;
}) => {
  if (direction === "down") {
    return grid;
  } else if (direction === "up") {
    return rotate180(grid);
  } else if (direction === "left") {
    return reverse ? rotate90(grid) : rotate270(grid);
  } else {
    // direction === right
    return reverse ? rotate270(grid) : rotate90(grid);
  }
};

export const updateGridState = ({
  direction,
  grid,
}: {
  direction: Direction;
  grid: GridState;
}) => {
  const rotatedGrid = getRotatedGrid({ direction, grid: cloneDeep(grid) });

  const newGrid = rotatedGrid.map((line) => {
    const combinedLine = combineLine(line);
    const compressedLine = compressLine(combinedLine);
    return compressedLine;
  });

  const originalOrientationGrid = getRotatedGrid({
    direction,
    grid: newGrid,
    reverse: true,
  });

  return originalOrientationGrid;
};
