import React, { useState } from "react";
import { EColors, EIcons } from "../../exports";
import { convertData } from "../../utils/js/convertData";
import { UserLink } from "./../UserLink";
import { AnswerFormContainer } from "../AnswerFormContainer";
import { Icon } from "../Icons";
import { Text } from "../Text";
import styles from "./comment.css";

interface ICommentProps {
  readonly key?: string;
  commentId?: string;
  userName?: string;
  gilded?: string;
  text?: string;
  timeCreated?: number;
  replies?: [ICommentProps];
}

interface ICommentsObject {
  id?: string;
  author?: string;
  gilded?: string;
  text?: string;
  created?: number;
  replies?: [ICommentsObject];
}

export function Comment({
    userName,
    text,
    timeCreated,
    gilded,
    replies,
  }: ICommentProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!userName || userName === "undefined") return null;
  return (
    <div className={styles.comment}>
      <div className={styles.metaData}>
        <UserLink name={userName} />
        <span className={styles.createdAt}>
          {timeCreated && convertData(new Date(timeCreated * 1000))}
        </span>
        <span className={styles.gilded}>{gilded}</span>
      </div>
      <p className={styles.comment_text}>{text}</p>
      <ul className={styles.menuItemsList}>
        <li
          className={styles.menuItem}
          onClick={(event) => {
            setIsFormOpen(!isFormOpen);
          }}
        >
          <Icon name={EIcons.comment} size={15} />
          <Text size={14} color={EColors.grey99}>
            Ответить
          </Text>
        </li>
        <li className={styles.menuItem}>
          <Icon name={EIcons.share} size={14} />
          <Text size={14} color={EColors.grey99}>
            Поделиться
          </Text>
        </li>
        <li className={styles.menuItem}>
          <Icon name={EIcons.warning} size={16} />
          <Text size={14} color={EColors.grey99}>
            Пожаловаться
          </Text>
        </li>
      </ul>
      {isFormOpen &&
        <AnswerFormContainer
          onClose={() => { setIsFormOpen(false) }}
         />
      }
      {replies &&
        replies.map((comment: ICommentsObject) => (
          <Comment
            key={comment.id}
            commentId={comment.id}
            userName={comment.author}
            gilded={comment.gilded}
            text={comment.text}
            timeCreated={comment.created}
            replies={comment.replies}
          />
        ))}
    </div>
  );
}
