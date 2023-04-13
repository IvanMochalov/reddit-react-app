import React from 'react';
import styles from './saveButton.css';
import { SaveIcon } from './../Icons'

export function SaveButton() {
  return (
    <button className={styles.saveButton}>
      <SaveIcon />
    </button>
  );
}
