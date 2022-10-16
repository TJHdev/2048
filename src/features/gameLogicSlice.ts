import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEqual } from "lodash";
import { RootState } from "../app/store";
import {
  combineLine,
  compressLine,
  createNewGrid,
  getRotatedGrid,
  placeValueInRandomAvailableCell,
} from "./gameHelpers";
import { Direction, GridState, GameState } from "./types";

export interface GameReducerState {
  gridState: GridState;
  gameState: GameState;
  turnNumber: number;
  formWidth: number;
  formHeight: number;
  formObstacles: number;
}

const initialObstacles = 0;
const initialWidth = 6;
const initialHeight = 6;
const initialGrid = placeValueInRandomAvailableCell({
  grid: createNewGrid(initialWidth, initialHeight),
  value: 2,
});

const initialState: GameReducerState = {
  // gridState: [
  //   [0, 2, 2, 2, 2, 0],
  //   [0, 0, 0, 0, 0, 0],
  //   [0, 2, 0, 2, 0, 0],
  //   [0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0],
  // ],
  // gridState: [
  //   [0, 2, 2],
  //   [0, 0, 0],
  //   [0, 2, 0],
  // ],
  gridState: initialGrid,
  turnNumber: 1,
  gameState: GameState.playing,
  formWidth: initialWidth,
  formHeight: initialHeight,
  formObstacles: initialObstacles,
};

export const gameLogicSlice = createSlice({
  name: "gameLogic",
  initialState,
  reducers: {
    startNewGame: (
      state,
      action: PayloadAction<{ width?: number; height?: number }>
    ) => {
      const { width, height } = action.payload;
      const newGrid = createNewGrid(width, height);
      state.gridState = placeValueInRandomAvailableCell({
        grid: newGrid,
        value: 2,
      });
      state.turnNumber = 1;
    },

    move: (state, action: PayloadAction<Direction>) => {
      const direction = action.payload;
      const rotatedGrid = getRotatedGrid({ direction, grid: state.gridState });

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

      if (!isEqual(state.gridState, originalOrientationGrid)) {
        state.gridState = placeValueInRandomAvailableCell({
          grid: originalOrientationGrid,
          value: 2,
        });
        state.turnNumber++;
      }
      return state;
    },
  },
});

export const { startNewGame, move } = gameLogicSlice.actions;

export const selectGameState = (state: RootState) =>
  state.gameLogicReducer.gridState;

export default gameLogicSlice.reducer;
