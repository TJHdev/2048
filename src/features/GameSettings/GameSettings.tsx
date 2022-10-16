import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { startNewGame } from "../gameLogicSlice";
import styles from "../Game/Game.module.css";

export const GameSettings = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.row}>
      <button
        className={styles.button}
        aria-label="New game"
        onClick={() => dispatch(startNewGame({}))}
      >
        New game
      </button>
    </div>
  );
};
