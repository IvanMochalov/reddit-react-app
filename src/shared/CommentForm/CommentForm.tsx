import React, { ChangeEvent, FormEvent } from "react";
import styles from "./commentForm.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAtom } from 'jotai';
import { comment } from '../../store/commentJotai';


interface ICommentFormProps {
  name?: string;
  placeholder?: string;
  btnText?: string;
  value?: string;
  link?: any;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (event: FormEvent) => void;
}

interface ICommentFormData {
  commentText?: string;
}

export function CommentForm({
  name,
  btnText,
  value,
  link,
  placeholder,
  onChange,
}: ICommentFormProps) {

  const [commentText, setCommentText] = useAtom(comment);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setFocus
  } = useForm<ICommentFormData>();

  const onSubmit: SubmitHandler<ICommentFormData> = (data) => {
    alert(`Комментарий '${data.commentText}' отправлен пользователем ${name}`);
    setCommentText('');
    reset();
  };

  React.useEffect(() => {
    setFocus("commentText");
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} ref={link}>
      <textarea
        className={styles.input}
        {...register("commentText", {
          required: "Пожалуйста, напишите комментарий",
          minLength: {
            value: 3,
            message: "Введите более 3-х символов",
          },
        })}
        aria-invalid={errors.commentText?.message ? "true" : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errors.commentText && <div>{errors.commentText.message}</div>}
      <button type="submit" className={styles.button}>
        {btnText ? btnText : "Комментировать"}
      </button>
    </form>
  );
}
