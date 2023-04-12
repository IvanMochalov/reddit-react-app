import React from "react";
import styles from "./card.css";
import { Controls } from "./Controls";
import { Menu } from "./Menu";
import { Preview } from "./Preview";
import { TextContent } from "./TextContent";

interface ICardProps {
  readonly key?: string;
  postId?: string;
  title?: string;
  preview?: string;
  userName?: string;
  userImg?: string;
  rating?: number
  timeCreated?: number;
}

export function Card({ title, preview, userName, userImg, rating, timeCreated, postId }: ICardProps) {

  return (
    <li className={styles.card}>
      <TextContent
        postId={postId}
        postTitle={title}
        userName={userName}
        userImg={userImg}
        timeCreated={timeCreated}
      />
      <Preview preview={preview} />
      <Menu />
      <Controls rating={rating} />
    </li>
  );
}
