import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  move,
  selectGameState,
  selectGridState,
} from "../reducer/gameLogicSlice";
import styles from "./Grid.module.css";
import { useEffect } from "react";
import { getColour, keyActions } from "../utils/constants";
import { GameState } from "../utils/types";

export function Grid() {
  const gridState = useAppSelector(selectGridState);
  const gameState = useAppSelector(selectGameState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gameState === GameState.won) {
      setTimeout(() => {
        alert(`You won!`);
      }, 100);
    }
    if (gameState === GameState.lost) {
      setTimeout(() => {
        alert("Game over");
      }, 100);
    }
  }, [gameState]);

  useEffect(() => {
    const keyDownCallback = (event: KeyboardEvent) => {
      if (keyActions.up.has(event.code)) {
        dispatch(move("up"));
      } else if (keyActions.down.has(event.code)) {
        dispatch(move("down"));
      } else if (keyActions.right.has(event.code)) {
        dispatch(move("right"));
      } else if (keyActions.left.has(event.code)) {
        dispatch(move("left"));
      }
    };

    document.addEventListener("keydown", keyDownCallback);

    return () => document.removeEventListener("keydown", keyDownCallback);
  }, [dispatch]);

  return (
    <div className={styles.game_container}>
      <div className={styles.row}>
        {gridState.map((row, xIndex) => (
          <div key={`x-${xIndex}`}>
            {[...row].reverse().map((cell, yIndex) => (
              <div
                style={{ backgroundColor: getColour(cell) }}
                key={`x-${xIndex}-y-${yIndex}`}
                className={cell === -1 ? styles.obstacle : styles.cell}
              >
                {cell !== 0 && cell !== -1 && cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
