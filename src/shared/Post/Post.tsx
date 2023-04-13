import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CommentFormContainer } from "../CommentFromContainer";
import { CommentsBlock } from "../CommentsBlock";
import styles from "./post.css";
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { deleteCommentData } from '../../store/commentsSlice'
import { useNavigate, useParams } from 'react-router-dom'


export function Post() {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  let { postId } = useParams();

  const {content, loading, error} = useAppSelector((state) => state.commentsData);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        navigate('/posts');
        dispatch(deleteCommentData({data: [], content: {title: '', text: ''}}))
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const node = document.querySelector("#modal_root");
  if (!node) return null;

  return createPortal(
    <div className={styles.modal} ref={ref}>

      {loading &&
        (<div className={styles.loading}>{'Loading...'}</div>)
      }

      {error &&
        (<div className={styles.error} role='alert'>{`404 - Not found (${error})`}</div>)
        // (<div className={styles.error} role='alert'>{`Error: ${error}`}</div>)
      }

      {content.title &&
        (<h2>{content.title}</h2>)
      }

      <div className={styles.content}>
        {content.text &&
          (<p>{content.text}</p>)
        }
      </div>

      <CommentFormContainer />

      <CommentsBlock postId={postId} />

    </div>,
    node
  );
}
