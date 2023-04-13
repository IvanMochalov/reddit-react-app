import React from 'react';
import styles from './commentButton.css';
import { Icon } from './../Icons';
import { EColors, EIcons } from './../../exports';

export function CommentButton() {
  return (
    <button className={styles.commentsButton}>
      <Icon name={EIcons.comment} size={15} fill={EColors.greyC4} />
      <span className={styles.commentsNumber}>13</span>
    </button>
  );
}
