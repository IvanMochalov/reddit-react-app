import React, { useEffect } from 'react';
import styles from './commentsblock.css';
import { Comment } from '../Comment/Comment';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { fetchCommentsData } from '../../store/commentsSlice';

interface ICommentsObject {
  id?: string;
  author?: string;
  gilded?: string
  text?: string;
  created?: number;
  replies?: [ICommentsObject]
}

interface ICommentsBlockProps {
  postId?: string;
}

export function CommentsBlock({ postId }: ICommentsBlockProps) {
  const token = useAppSelector((state) => state.main.token);
  const {comments, loading, error} = useAppSelector((state) => state.commentsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token || token === "undefined") return;
    dispatch(fetchCommentsData({token, postId}));
  }, [token]);

  return (
    <ul className={styles.commentsList}>
      {comments.length === 0 && !loading && !error && (
        (<div className={styles.loading}>{'No data available'}</div>)
      )}

      {comments &&
        comments.map((comment: ICommentsObject) => (
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

      {loading &&
        (<div className={styles.loading}>{'Loading...'}</div>)
      }

      {error &&
        (<div className={styles.error} role='alert'>{`404 - Not found (${error})`}</div>)
        // (<div className={styles.error} role='alert'>{`Error: ${error}`}</div>)
      }
    </ul>
  );
}

