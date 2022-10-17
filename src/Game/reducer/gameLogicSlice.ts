import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEqual, clamp } from "lodash";
import { RootState } from "../../app/store";
import {
  createNewGrid,
  getCellsCount,
  placeValueInRandomAvailableCell,
  updateGridState,
} from "../utils/gameHelpers";
import { Direction, GridState, GameState, FormValues } from "../utils/types";

export interface GameReducerState {
  gridState: GridState;
  gameState: GameState;
  turnNumber: number;
  form: FormValues;
}

const initialWidth = 6;
const initialHeight = 6;
const initialObstacles = 0;
const initialGrid = placeValueInRandomAvailableCell({
  grid: createNewGrid(initialWidth, initialHeight),
  value: 2,
});

const formMinMaxValues = {
  width: { min: 3, max: 10 },
  height: { min: 3, max: 10 },
  obstacles: { min: 0, max: 4 },
};

export const initialState: GameReducerState = {
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
      const gridWithStartingValue = placeValueInRandomAvailableCell({
        grid: newGrid,
        value: 2,
      });
      const obstacles = new Array(state.form.obstacles).fill(-1);
      const finalGrid = obstacles.reduce((acc, value) => {
        return placeValueInRandomAvailableCell({
          grid: acc,
          value,
        });
      }, gridWithStartingValue);

      state.gridState = finalGrid;
      state.gameState = GameState.playing;
      state.turnNumber = 1;
    },

    move: (state, action: PayloadAction<Direction>) => {
      if (state.gameState !== GameState.playing) return;
      const direction = action.payload;

      const updatedGrid = updateGridState({ direction, grid: state.gridState });

      if (isEqual(state.gridState, updatedGrid)) return;

      const finalGrid = placeValueInRandomAvailableCell({
        grid: updatedGrid,
        value: 2,
      });

      state.gridState = finalGrid;
      state.turnNumber++;

      const playHasWon = getCellsCount(finalGrid, 2048) > 0;
      if (playHasWon) {
        state.gameState = GameState.won;
      }

      const hasNoAvailableCells = getCellsCount(finalGrid) === 0;
      if (hasNoAvailableCells) {
        const directions = ["up", "down", "left", "right"] as const;

        const noAvailableMoves = directions.every((direction) => {
          return isEqual(
            finalGrid,
            updateGridState({ direction, grid: finalGrid })
          );
        });

        if (noAvailableMoves) {
          state.gameState = GameState.lost;
        }
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

export const actions = gameLogicSlice.actions;

export const selectGridState = (state: RootState) =>
  state.gameLogicReducer.gridState;

export const selectGameState = (state: RootState) =>
  state.gameLogicReducer.gameState;

export const selectForm = (state: RootState) => state.gameLogicReducer.form;

export default gameLogicSlice.reducer;
