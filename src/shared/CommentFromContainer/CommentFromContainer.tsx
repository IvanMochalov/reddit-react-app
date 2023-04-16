import React, { ChangeEvent } from "react";
import { useAppSelector } from "../../hooks/useReduxHooks";
import { CommentForm } from "../CommentForm";
import { useAtom } from 'jotai';
import { comment } from '../../store/commentJotai';

export function CommentFormContainer() {
  const [commentText, setCommentText] = useAtom(comment);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setCommentText(event.target.value);
  }

  const { name } = useAppSelector(state => state.userData.data);

  return (
    <CommentForm
      name={name}
      value={commentText}
      onChange={handleChange}
      placeholder={
        name !== "undefined"
          ? `${name}, оставьте ваш комментарий`
          : `Пожалуйста, оставьте ваш комментарий`
      }
    />
  );
}
