import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import gameLogicReducer, { initialState } from "./Game/reducer/gameLogicSlice";
import { store } from "./app/store";

jest.spyOn(global, "alert");

test("Updates the form width values and respects the min max", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const widthInput = screen.getByRole("spinbutton", { name: "width" });
  expect(widthInput).toHaveValue(6);
  fireEvent.change(widthInput, { target: { value: 1 } });
  expect(widthInput).toHaveValue(3);
  fireEvent.change(widthInput, { target: { value: 12 } });
  expect(widthInput).toHaveValue(10);
  fireEvent.change(widthInput, { target: { value: 5 } });
  expect(widthInput).toHaveValue(5);
});

test("Starts a new game with the new grid size", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByTestId("x-5-y-5")).toBeInTheDocument();
  expect(screen.queryByTestId("x-9-y-9")).not.toBeInTheDocument();

  const widthInput = screen.getByRole("spinbutton", { name: "width" });
  fireEvent.change(widthInput, { target: { value: 10 } });
  const heightInput = screen.getByRole("spinbutton", { name: "height" });
  fireEvent.change(heightInput, { target: { value: 10 } });
  const newGameButton = screen.getByRole("button", { name: "New game" });
  fireEvent.click(newGameButton);

  expect(screen.getByTestId("x-9-y-9")).toBeInTheDocument();
});

export const mockStoreNearlyWon = configureStore({
  reducer: {
    gameLogicReducer,
  },
  preloadedState: {
    gameLogicReducer: {
      ...initialState,
      gridState: [
        [1024, 1024, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
  },
});

test("Alerts the player when the game is WON", async () => {
  render(
    <Provider store={mockStoreNearlyWon}>
      <App />
    </Provider>
  );

  fireEvent.keyDown(document, { code: "KeyS" });

  await waitFor(() => {
    expect(global.alert).toHaveBeenCalled();
  });
  expect(global.alert).toHaveBeenCalledWith("You won!");
});

export const mockStoreNearlyLost = configureStore({
  reducer: {
    gameLogicReducer,
  },
  preloadedState: {
    gameLogicReducer: {
      ...initialState,
      gridState: [
        [2, 4, 8],
        [0, 32, 16],
        [256, 128, 64],
      ],
    },
  },
});

test("Alerts the player when the game is LOST", async () => {
  render(
    <Provider store={mockStoreNearlyLost}>
      <App />
    </Provider>
  );

  fireEvent.keyDown(document, { code: "KeyS" });

  await waitFor(() => {
    expect(global.alert).toHaveBeenCalled();
  });
  expect(global.alert).toHaveBeenCalledWith("Game over");
});
