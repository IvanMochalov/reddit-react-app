import React from 'react';
import styles from './shareButton.css';
import { ShareIcon } from '../../../../Icons'

export function ShareButton() {
  return (
    <button className={styles.shareButton}>
      <ShareIcon />
    </button>
  );
}
