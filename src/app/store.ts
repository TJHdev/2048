import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gameLogicReducer from "../Game/reducer/gameLogicSlice";

export const store = configureStore({
  reducer: {
    gameLogicReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
