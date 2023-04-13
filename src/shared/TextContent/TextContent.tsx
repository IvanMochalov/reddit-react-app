import React from 'react';
import { convertData } from './../../utils/js/convertData'
import styles from './textContent.css';
import { Title } from './../Title';
import { UserLink } from './../UserLink';

interface ITextContentProps {
  postTitle?: string;
  userName?: string;
  userImg?: string;
  timeCreated?: number;
  postId?: string;
}

export function TextContent({ postTitle, userName, userImg, postId, timeCreated }: ITextContentProps) {
  return (
      <div className={styles.textContent}>
        <div className={styles.metaData}>
          < UserLink name={userName} avatar={userImg} />
          <span className={styles.createdAt}>
            <span className={styles.publishedLabel}>published </span>
            {timeCreated && convertData(new Date(timeCreated * 1000))}
          </span>
        </div>
        <Title
          postTitle={postTitle}
          postId={postId}
        />
      </div>
  );
}
