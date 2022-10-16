import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEqual, clamp } from "lodash";
import { RootState } from "../app/store";
import {
  combineLine,
  compressLine,
  createNewGrid,
  getRotatedGrid,
  placeValueInRandomAvailableCell,
} from "./gameHelpers";
import { Direction, GridState, GameState, FormValues } from "./types";

export interface GameReducerState {
  gridState: GridState;
  gameState: GameState;
  turnNumber: number;
  form: FormValues;
}

const initialObstacles = 0;
const initialWidth = 6;
const initialHeight = 6;
const initialGrid = placeValueInRandomAvailableCell({
  grid: createNewGrid(initialWidth, initialHeight),
  value: 2,
});

const formMinMaxValues = {
  width: { min: 4, max: 10 },
  height: { min: 4, max: 10 },
  obstacles: { min: 0, max: 4 },
};

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
  form: {
    width: initialWidth,
    height: initialHeight,
    obstacles: initialObstacles,
  },
};

export const gameLogicSlice = createSlice({
  name: "gameLogic",
  initialState,
  reducers: {
    startNewGame: (state) => {
      const newGrid = createNewGrid(state.form.width, state.form.height);
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

    updateFormValue: (
      state,
      action: PayloadAction<{ key: keyof FormValues; value: number }>
    ) => {
      const { key, value } = action.payload;
      const { min, max } = formMinMaxValues[key];
      state.form[key] = clamp(value, min, max);
    },
  },
});

export const { startNewGame, move, updateFormValue } = gameLogicSlice.actions;

export const selectGameState = (state: RootState) =>
  state.gameLogicReducer.gridState;

export const selectForm = (state: RootState) => state.gameLogicReducer.form;

export default gameLogicSlice.reducer;
