export type GridState = number[][];
export type Direction = "up" | "down" | "left" | "right";
export enum GameState {
  "playing",
  "won",
  "lost",
}

export interface FormValues {
  width: number;
  height: number;
  obstacles: number;
}

export type FormKeys = keyof FormValues;
