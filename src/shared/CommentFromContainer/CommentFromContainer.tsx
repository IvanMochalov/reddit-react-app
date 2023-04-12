import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { updateComment } from "../../store/mainSlice";
import { CommentForm } from "../CommentForm";

export function CommentFormContainer() {
  const value = useAppSelector((state) => state.main.commentText);
  const { name } = useAppSelector(state => state.userData.data);

  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(event.target.value));
  }

  // function handleSubmit(event: FormEvent) {
  //   event.preventDefault();
  //   alert('Форма отправлена')
  // }

  return (
    <CommentForm
      name={name}
      value={value}
      onChange={handleChange}
      // onSubmit={handleSubmit}
    />
  );
}
