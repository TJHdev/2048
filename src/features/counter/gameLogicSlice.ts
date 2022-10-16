import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CounterState {
  gridState: number[][];
  turnNumber: number;
  availableCells: number;
}

const createNewGrid = (width = 6, height = 6) => {
  const column = Array(height).fill(0);
  // const column1 = Array(height).fill(1);
  return Array(width).fill(column);
};

const initialState: CounterState = {
  gridState: [
    [0, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  turnNumber: 1,
  availableCells: 36,
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
      state.gridState = createNewGrid(width, height);
    },

    move: (state, action: PayloadAction<"up" | "down" | "right" | "left">) => {
      console.log("action", action);
      // state.gridState = createNewGrid();
      // use a different transform depending on which direction is actioned
      // grab the lines based on the direction
      // perform standard transform
      // reinsert the line back into its orientation
      return state;
    },
  },
});

export const { startNewGame, move } = gameLogicSlice.actions;

export const selectGameState = (state: RootState) => state.counter.gridState;

export default gameLogicSlice.reducer;
