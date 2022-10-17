import { GameState } from "../utils/types";
import gameLogicReducer, { GameReducerState, actions } from "./gameLogicSlice";

const { startNewGame, move, updateFormValue } = actions;

const defaultFormConfig = {
  width: 6,
  height: 6,
  obstacles: 0,
};

const defaultGrid = [
  [0, 2, 2],
  [0, 0, 0],
  [0, 2, 0],
];

describe("Given the gameLogicReducer in an early game state", () => {
  const initialState: GameReducerState = {
    form: defaultFormConfig,
    gridState: defaultGrid,
    gameState: GameState.playing,
    turnNumber: 3,
  };

  it("should create a new board on reset", () => {
    const { gridState } = gameLogicReducer(initialState, startNewGame());
    expect(gridState).not.toEqual(defaultGrid);
  });

  it("should and correctly update the grid on UP", () => {
    const { gridState } = gameLogicReducer(initialState, move("up"));
    expect(gridState[0][2]).toEqual(4);
    expect(gridState[2][2]).toEqual(2);
  });

  it("should and correctly update the grid on DOWN", () => {
    const { gridState } = gameLogicReducer(initialState, move("down"));
    expect(gridState[0][0]).toEqual(4);
    expect(gridState[2][0]).toEqual(2);
  });

  it("should and correctly update the grid on LEFT", () => {
    const { gridState } = gameLogicReducer(initialState, move("left"));
    expect(gridState[0][1]).toEqual(4);
    expect(gridState[0][2]).toEqual(2);
  });

  it("should and correctly update the grid on RIGHT", () => {
    const { gridState } = gameLogicReducer(initialState, move("right"));
    expect(gridState[2][1]).toEqual(4);
    expect(gridState[2][2]).toEqual(2);
  });

  it("should increment turn", () => {
    const { turnNumber } = gameLogicReducer(initialState, move("down"));
    expect(turnNumber).toEqual(initialState.turnNumber + 1);
  });

  it("should put the game in the WON state when 2048 is reached", () => {
    const { gameState } = gameLogicReducer(
      {
        ...initialState,
        gridState: [
          [0, 0, 0],
          [1024, 1024, 0],
          [0, 0, 0],
        ],
      },
      move("down")
    );
    expect(gameState).toEqual(GameState.won);
  });

  it("should put the game in the LOST state when there are no more available moves", () => {
    const { gameState } = gameLogicReducer(
      {
        ...initialState,
        gridState: [
          [2, 4, 8],
          [0, 32, 16],
          [256, 128, 64],
        ],
      },
      move("down")
    );

    expect(gameState).toEqual(GameState.lost);
  });

  it("should update the form values", () => {
    const { form } = gameLogicReducer(
      {
        ...initialState,
        gridState: [
          [2, 4, 8],
          [0, 32, 16],
          [256, 128, 64],
        ],
      },
      updateFormValue({ key: "width", value: 5 })
    );

    expect(form.width).toEqual(5);
  });
});
