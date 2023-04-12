import React from 'react';
import styles from './controls.css';
import { CommentButton } from './CommentButton';
import { KarmaCounter } from './KarmaCounter';
import { ShareButton } from './ShareButton';
import { SaveButton } from './SaveButton';

interface IControlsProps {
  rating?: number;
}

export function Controls({ rating }: IControlsProps) {
  return (
    <div className={styles.controls}>
      <KarmaCounter rating={rating} />
      <CommentButton />
      <div className={styles.actions}>
        <ShareButton />
        <SaveButton />
      </div>
    </div>
  );
}
