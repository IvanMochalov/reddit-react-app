import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/useReduxHooks";
import { CommentForm } from '../CommentForm';

interface IAnswerFormProps {
  btnText?: string;
  onClose?: () => void;
}


export function AnswerFormContainer({ onClose }: IAnswerFormProps) {
  const { name } = useAppSelector(state => state.userData.data);

  const refFrom = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !refFrom.current?.contains(event.target)) {
        onClose?.();
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [])

  return (
    <CommentForm
      name={name}
      link={refFrom}
      btnText='Ответить'
    />
  );
}
