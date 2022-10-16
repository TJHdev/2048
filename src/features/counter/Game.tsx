import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { startNewGame, move, selectGameState } from "./gameLogicSlice";
import styles from "./Game.module.css";
import { useEffect } from "react";

const up = new Set(["ArrowUp", "KeyW"]);
const down = new Set(["ArrowDown", "KeyS"]);
const right = new Set(["ArrowRight", "KeyD"]);
const left = new Set(["ArrowLeft", "KeyA"]);

export function Game() {
  const gameState = useAppSelector(selectGameState);
  const dispatch = useAppDispatch();

  // add keyboard listeners for directions
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (up.has(event.code)) {
        dispatch(move("up"));
      } else if (down.has(event.code)) {
        dispatch(move("down"));
      } else if (right.has(event.code)) {
        dispatch(move("right"));
      } else if (left.has(event.code)) {
        dispatch(move("left"));
      }
    };

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [dispatch]);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="New game"
          onClick={() => dispatch(startNewGame({}))}
        >
          New game
        </button>
      </div>
      <div className={styles.row}>
        {gameState.map((row, xIndex) => (
          <div key={`x-${xIndex}`}>
            {row.map((cell, yIndex) => (
              <div key={`x-${xIndex}-y-${yIndex}`} className={styles.cell}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}