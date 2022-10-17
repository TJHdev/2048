import React, { ChangeEvent, KeyboardEvent, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectForm, actions } from "../reducer/gameLogicSlice";
import styles from "./GameSettings.module.css";
import { FormKeys } from "../utils/types";

const { startNewGame, updateFormValue } = actions;

export const GameSettings = () => {
  const dispatch = useAppDispatch();
  const { width, height, obstacles } = useAppSelector(selectForm);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      dispatch(
        updateFormValue({ key: name as FormKeys, value: Number(value) })
      );
    },
    [dispatch]
  );

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <label className={styles.label}>Width</label>
        <input
          name="width"
          className={styles.textbox}
          aria-label="width"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={width}
          type="number"
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label}>Height</label>
        <input
          name="height"
          className={styles.textbox}
          aria-label="height"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={height}
          type="number"
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label}>Obstacles</label>
        <input
          name="obstacles"
          className={styles.textbox}
          aria-label="obstacles"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={obstacles}
          type="number"
        />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="New game"
          onClick={() => dispatch(startNewGame())}
        >
          New game
        </button>
      </div>
    </div>
  );
};
