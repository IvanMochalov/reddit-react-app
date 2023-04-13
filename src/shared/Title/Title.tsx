import React from 'react';
import styles from './title.css';
import { Link } from 'react-router-dom';

interface ITitleProps {
  postTitle?: string;
  postId?: string;
}

export function Title({ postTitle, postId }: ITitleProps) {
  return (
    <h2 className={styles.title} >
      <Link className={styles.postLink} to={`/posts/${postId}`} >
        {postTitle}
      </Link>
    </h2>
  );
}
