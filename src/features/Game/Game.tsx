import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { move, selectGameState } from "../gameLogicSlice";
import styles from "./Game.module.css";
import { useEffect } from "react";
import { getColour, keyActions } from "../constants";

export function Game() {
  const gameState = useAppSelector(selectGameState);
  const dispatch = useAppDispatch();

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
        {gameState.map((row, xIndex) => (
          <div key={`x-${xIndex}`}>
            {[...row].reverse().map((cell, yIndex) => (
              <div
                style={{ backgroundColor: getColour(cell) }}
                key={`x-${xIndex}-y-${yIndex}`}
                className={styles.cell}
              >
                {cell !== 0 && cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
